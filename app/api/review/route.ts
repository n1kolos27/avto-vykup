import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/sender';
import { formatReviewEmail } from '@/lib/email/templates';
import { rateLimit } from '@/lib/rate-limiting/memory';
import { getClientIP } from '@/lib/rate-limiting/utils';
import { sanitizeString, sanitizePhone, sanitizeNumber, sanitizeText } from '@/lib/security/sanitization';
import { validateReviewForm } from '@/lib/validation/forms';
import { APP_CONFIG, RATE_LIMIT, ENV } from '@/lib/config';

/**
 * Production-ready API route для обработки отзывов
 * Включает: rate limiting, валидацию, санитизацию, обработку ошибок
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let clientIP = 'unknown';

  try {
    // Rate limiting
    clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`review:${clientIP}`, RATE_LIMIT.REVIEW);

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
            'X-RateLimit-Limit': '3',
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

    const formData = body as Record<string, unknown>;

    // Валидация данных
    const validation = validateReviewForm(formData);
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
    const nameResult = sanitizeString(String(formData.name || ''), { maxLength: 100 });
    const ratingResult = sanitizeNumber(Number(formData.rating || 0), { min: 1, max: 5 });
    const textResult = sanitizeText(String(formData.text || ''), { maxLength: 2000 });
    const carModelResult = formData.carModel
      ? sanitizeString(String(formData.carModel), { maxLength: 50 })
      : null;
    const phoneResult = formData.phone ? sanitizePhone(String(formData.phone)) : null;

    // Проверка результатов санитизации
    if (!ratingResult.value || !Number.isInteger(ratingResult.value) || ratingResult.value < 1 || ratingResult.value > 5) {
      return NextResponse.json(
        {
          success: false,
          error: 'Рейтинг должен быть от 1 до 5',
        },
        { status: 400 }
      );
    }

    if (textResult.value.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Отзыв слишком короткий (минимум 10 символов)',
        },
        { status: 400 }
      );
    }

    if (!nameResult.value) {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверный формат имени',
        },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: nameResult.value,
      rating: ratingResult.value,
      text: textResult.value,
      carModel: carModelResult?.value,
      phone: phoneResult?.value,
    };

    // Формируем email
    const emailData = formatReviewEmail({
      name: sanitizedData.name,
      rating: sanitizedData.rating,
      text: sanitizedData.text,
      carModel: sanitizedData.carModel,
      phone: sanitizedData.phone,
    });

    // Отправляем email (опционально, для модерации)
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
      console.log('Review request processed', {
        ip: clientIP,
        processingTime,
        success: emailResult.success,
        rating: sanitizedData.rating,
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
            error: 'Ошибка при отправке отзыва. Попробуйте позже или свяжитесь с нами по телефону.',
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

      // В dev режиме логируем, но возвращаем success
      console.warn('Email service not configured, but returning success in dev mode');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Отзыв успешно отправлен. Спасибо за ваш отзыв!',
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
    console.error('Error processing review request:', {
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
