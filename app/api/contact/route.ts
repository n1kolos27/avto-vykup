import { APP_CONFIG, ENV, RATE_LIMIT } from '@/lib/config';
import { sendEmail } from '@/lib/email/sender';
import { formatContactEmail } from '@/lib/email/templates';
import { rateLimit } from '@/lib/rate-limiting/memory';
import { getClientIP } from '@/lib/rate-limiting/utils';
import { sanitizeEmail, sanitizePhone, sanitizeString, sanitizeText } from '@/lib/security/sanitization';
import { validateContactForm } from '@/lib/validation/forms';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Production-ready API route для обработки контактных форм
 * Включает: rate limiting, валидацию, санитизацию, обработку ошибок
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let clientIP = 'unknown';

  try {
    // Rate limiting
    clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`contact:${clientIP}`, RATE_LIMIT.CONTACT);

    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        { success: false, error: 'Слишком много запросов. Попробуйте позже.' },
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

    const formData = body as Record<string, unknown>;

    // Валидация данных
    const validation = validateContactForm(formData);
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
    const phoneResult = sanitizePhone(String(formData.phone || ''));
    const sanitizedEmailResult = formData.email ? sanitizeEmail(String(formData.email)) : null;
    const messageResult = sanitizeText(String(formData.message || ''), { maxLength: 5000 });

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

    if (messageResult.value.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Сообщение слишком короткое (минимум 10 символов)',
        },
        { status: 400 }
      );
    }

    if (formData.email && (!sanitizedEmailResult || !sanitizedEmailResult.value)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверный формат email',
        },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: nameResult.value,
      phone: phoneResult.value,
      email: sanitizedEmailResult?.value,
      message: messageResult.value,
    };

    // Формируем email
    const emailData = formatContactEmail({
      name: sanitizedData.name,
      phone: sanitizedData.phone,
      email: sanitizedData.email,
      message: sanitizedData.message,
    });

    // Отправляем email
    const recipientEmail = APP_CONFIG.EMAIL;
    const sendEmailResult = await sendEmail({
      to: recipientEmail,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    // Логирование для мониторинга
    const processingTime = Date.now() - startTime;
    if (ENV.NODE_ENV === 'production') {
      console.log('Contact request processed', {
        ip: clientIP,
        processingTime,
        success: sendEmailResult.success,
        timestamp: new Date().toISOString(),
      });
    }

    if (!sendEmailResult.success) {
      console.error('Failed to send email:', sendEmailResult.error);

      // В production режиме возвращаем ошибку
      if (ENV.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            error: 'Ошибка при отправке сообщения. Попробуйте позже или свяжитесь с нами по телефону.',
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
        message: 'Сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.',
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
    console.error('Error processing contact request:', {
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
