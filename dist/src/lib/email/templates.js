/**
 * Email System - Email Templates
 *
 * Шаблоны для различных типов писем
 */
import { CAR_CONDITION_LABELS } from '../config/constants.js';
/**
 * Форматирование email для заявки на оценку
 */
export function formatEvaluationEmail(data) {
    const subject = `Новая заявка на оценку: ${data.brand} ${data.model}`;
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0284c7; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0284c7; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Новая заявка на оценку автомобиля</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Имя:</div>
              <div class="value">${data.name || 'Не указано'}</div>
            </div>
            <div class="field">
              <div class="label">Телефон:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Марка:</div>
              <div class="value">${data.brand}</div>
            </div>
            <div class="field">
              <div class="label">Модель:</div>
              <div class="value">${data.model}</div>
            </div>
            <div class="field">
              <div class="label">Год выпуска:</div>
              <div class="value">${data.year}</div>
            </div>
            <div class="field">
              <div class="label">Пробег:</div>
              <div class="value">${data.mileage.toLocaleString('ru-RU')} км</div>
            </div>
            <div class="field">
              <div class="label">Состояние:</div>
              <div class="value">${CAR_CONDITION_LABELS[data.condition] || data.condition}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
    const text = `
Новая заявка на оценку автомобиля

Имя: ${data.name || 'Не указано'}
Телефон: ${data.phone}
Марка: ${data.brand}
Модель: ${data.model}
Год выпуска: ${data.year}
Пробег: ${data.mileage.toLocaleString('ru-RU')} км
Состояние: ${CAR_CONDITION_LABELS[data.condition] || data.condition}
  `;
    return { subject, html, text };
}
/**
 * Форматирование email для контактной формы
 */
export function formatContactEmail(data) {
    const subject = `Новое сообщение от ${data.name}`;
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0284c7; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0284c7; }
          .value { margin-top: 5px; }
          .message { background: white; padding: 15px; border-left: 4px solid #0284c7; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Новое сообщение с сайта</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Имя:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Телефон:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            ${data.email ? `
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Сообщение:</div>
              <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
    const text = `
Новое сообщение с сайта

Имя: ${data.name}
Телефон: ${data.phone}
${data.email ? `Email: ${data.email}\n` : ''}
Сообщение:
${data.message}
  `;
    return { subject, html, text };
}
/**
 * Форматирование email для отзыва
 */
export function formatReviewEmail(data) {
    const subject = `Новый отзыв от ${data.name} (${data.rating}★)`;
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0284c7; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0284c7; }
          .value { margin-top: 5px; }
          .rating { font-size: 24px; color: #fbbf24; }
          .review { background: white; padding: 15px; border-left: 4px solid #0284c7; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Новый отзыв на сайте</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Имя:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Рейтинг:</div>
              <div class="value rating">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</div>
            </div>
            ${data.carModel ? `
            <div class="field">
              <div class="label">Автомобиль:</div>
              <div class="value">${data.carModel}</div>
            </div>
            ` : ''}
            ${data.phone ? `
            <div class="field">
              <div class="label">Телефон:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Отзыв:</div>
              <div class="review">${data.text.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
    const text = `
Новый отзыв на сайте

Имя: ${data.name}
Рейтинг: ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}
${data.carModel ? `Автомобиль: ${data.carModel}\n` : ''}
${data.phone ? `Телефон: ${data.phone}\n` : ''}
Отзыв:
${data.text}
  `;
    return { subject, html, text };
}
