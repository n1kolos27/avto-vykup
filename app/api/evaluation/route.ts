import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/sender';
import { formatEvaluationEmail } from '@/lib/email/templates';
import { rateLimit } from '@/lib/rate-limiting/memory';
import { getClientIP } from '@/lib/rate-limiting/utils';
import { sanitizeString, sanitizePhone, sanitizeNumber } from '@/lib/security/sanitization';
import { validateEvaluationForm } from '@/lib/validation/forms';
import type { EvaluationFormData, ApiResponse } from '@/lib/types';
import { APP_CONFIG, RATE_LIMIT, ENV } from '@/lib/config';

/**
 * Production-ready API route для обработки заявок на оценку
 * Включает: rate limiting, валидацию, санитизацию, обработку ошибок
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  const startTime = Date.now();
  let clientIP = 'unknown';

  try {
    // Rate limiting
    clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`evaluation:${clientIP}`, RATE_LIMIT.EVALUATION);

    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: 'Слишком много запросов. Попробуйте позже.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'X-Content-Type-Options': 'nosniff',
          },
        }
      );
    }

    // Парсинг тела запроса
    let body: unknown;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверный формат данных. Проверьте запрос.',
        },
        {
          status: 400,
          headers: {
            'X-Content-Type-Options': 'nosniff',
          },
        }
      );
    }

    // Проверка типа данных
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверный формат данных.',
        },
        { status: 400 }
      );
    }

    const formData = body as Partial<EvaluationFormData>;

    // Валидация данных
    const validation = validateEvaluationForm(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors[0]?.message || 'Ошибка валидации данных',
          data: { errors: validation.errors },
        },
        { status: 400 }
      );
    }

    // Санитизация данных
    const nameResult = formData.name ? sanitizeString(formData.name, { maxLength: 100 }) : null;
    const phoneResult = sanitizePhone(formData.phone!);
    const brandResult = sanitizeString(formData.brand!, { maxLength: 50 });
    const modelResult = sanitizeString(formData.model!, { maxLength: 50 });
    const yearResult = sanitizeNumber(formData.year!, { min: 1900, max: new Date().getFullYear() + 1 });
    const mileageResult = sanitizeNumber(formData.mileage!, { min: 0, max: 10000000 });

    // Проверка результатов санитизации
    if (!phoneResult.value || phoneResult.value.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверный формат телефона',
        },
        { status: 400 }
      );
    }

    if (!brandResult.value || !modelResult.value) {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверный формат данных автомобиля',
        },
        { status: 400 }
      );
    }

    const sanitizedData: EvaluationFormData = {
      name: nameResult?.value,
      phone: phoneResult.value,
      brand: brandResult.value,
      model: modelResult.value,
      year: yearResult.value,
      mileage: mileageResult.value,
      condition: formData.condition as EvaluationFormData['condition'],
    };

    // Формируем email
    const emailData = formatEvaluationEmail({
      name: sanitizedData.name,
      phone: sanitizedData.phone,
      brand: sanitizedData.brand,
      model: sanitizedData.model,
      year: sanitizedData.year,
      mileage: sanitizedData.mileage,
      condition: sanitizedData.condition,
    });

    // Отправляем email
    const recipientEmail = APP_CONFIG.EMAIL;
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    // Логирование для мониторинга
    const processingTime = Date.now() - startTime;
    if (ENV.NODE_ENV === 'production') {
      console.log('Evaluation request processed', {
        ip: clientIP,
        processingTime,
        success: emailResult.success,
        timestamp: new Date().toISOString(),
      });
    }

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);

      // В production режиме возвращаем ошибку
      if (ENV.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            error: 'Ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами по телефону.',
          },
          { status: 500 }
        );
      }

      // В dev режиме логируем, но возвращаем success
      console.warn('Email service not configured, but returning success in dev mode');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
      },
      {
        status: 200,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Processing-Time': processingTime.toString(),
        },
      }
    );
  } catch (error) {
    const processingTime = Date.now() - startTime;

    // Логирование ошибки
    console.error('Error processing evaluation request:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: clientIP,
      processingTime,
      timestamp: new Date().toISOString(),
    });

    // В production не раскрываем детали ошибки
    const errorMessage =
      ENV.NODE_ENV === 'production'
        ? 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
        : error instanceof Error
        ? error.message
        : 'Неизвестная ошибка';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      {
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Processing-Time': processingTime.toString(),
        },
      }
    );
  }
}

// Обработка недопустимых методов
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Метод не разрешен' },
    { status: 405 }
  );
}
