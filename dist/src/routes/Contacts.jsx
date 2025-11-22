import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import Input from '../components/ui/Input.js';
import Button from '../components/ui/Button.js';
import Card from '../components/ui/Card.js';
import PhoneButton from '../components/PhoneButton.js';
import { APP_CONFIG } from '../lib/config/index.js';
import { toast } from '../lib/toast.js';
import { trackFormSubmit } from '../lib/analytics/events.js';
import { logger } from '../lib/logger.js';
const Contacts = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async () => {
        if (!formData.name || !formData.phone || !formData.message) {
            setError('Заполните все обязательные поля');
            return;
        }
        if (formData.message.length < 10) {
            setError('Сообщение должно содержать минимум 10 символов');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Получаем CSRF токен
            const { getCSRFToken } = await import('../lib/csrf.js');
            const csrfToken = await getCSRFToken();
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
                },
                body: JSON.stringify({
                    ...formData,
                    ...(csrfToken && { csrfToken }),
                }),
            });
            let result = await response.json();
            // Если получили ошибку CSRF, пробуем получить новый токен и повторить запрос
            if (response.status === 403 && result.code === 'CSRF_TOKEN_INVALID') {
                const { getCSRFToken, clearCSRFTokenCache } = await import('../lib/csrf.js');
                clearCSRFTokenCache();
                const newCsrfToken = await getCSRFToken();
                const retryResponse = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(newCsrfToken && { 'X-CSRF-Token': newCsrfToken }),
                    },
                    body: JSON.stringify({
                        ...formData,
                        ...(newCsrfToken && { csrfToken: newCsrfToken }),
                    }),
                });
                result = await retryResponse.json();
                if (!retryResponse.ok) {
                    throw new Error(result.error || 'Ошибка при отправке сообщения');
                }
            }
            else if (!response.ok) {
                throw new Error(result.error || 'Ошибка при отправке сообщения');
            }
            trackFormSubmit('contact');
            toast.success('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
            setIsSubmitted(true);
            setFormData({ name: '', phone: '', email: '', message: '' });
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }
        catch (error) {
            logger.error('Error submitting contact form', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            }, 'Contacts');
            const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позже.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleLinkPress = (path) => {
        navigate(path);
    };
    const openMap = () => {
        const url = 'https://yandex.ru/maps/?ll=37.6173%2C55.7558&z=10';
        window.open(url, '_blank');
    };
    return (<div className="flex-1 bg-neutral-50">
      <div className="max-w-[1200px] w-full mx-auto px-4">
        <Breadcrumbs />

        <div className="flex flex-col items-center mb-12 mt-4">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">Контакты</h1>
          <p className="text-lg text-neutral-600 text-center max-w-[600px] leading-6">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь вам
            продать автомобиль быстро и выгодно.
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-6 mb-6">
          <Card className="flex-1 min-w-[300px] p-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Свяжитесь с нами</h2>

            <div className="flex flex-row items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900 mb-2">Телефоны</p>
                <div className="flex flex-row gap-3 mt-2">
                  <PhoneButton phone={APP_CONFIG.PHONE_1}/>
                  <PhoneButton phone={APP_CONFIG.PHONE_2} variant="secondary"/>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <span className="text-2xl">✉️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900 mb-2">Email</p>
                <a href={`mailto:${APP_CONFIG.EMAIL}`} className="text-base text-primary-600 underline">
                  {APP_CONFIG.EMAIL}
                </a>
              </div>
            </div>

            <div className="flex flex-row items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900 mb-2">Регион работы</p>
                <p className="text-base text-neutral-700">Москва и Московская область</p>
              </div>
            </div>

            <div className="flex flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <span className="text-2xl">🕐</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-900 mb-2">Режим работы</p>
                <p className="text-base text-neutral-700">Ежедневно: 9:00 - 21:00</p>
                <p className="text-sm text-neutral-600 mt-1">Без выходных</p>
              </div>
            </div>
          </Card>

          <Card className="flex-1 min-w-[300px] p-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Форма обратной связи</h2>

            {isSubmitted ? (<div className="bg-success-100 border border-success-300 rounded-lg p-4">
                <h3 className="text-base font-semibold text-success-800 mb-1">
                  Спасибо за ваше обращение!
                </h3>
                <p className="text-sm text-success-700">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>) : (<div className="flex flex-col gap-4">
                {error && (<div className="bg-error-100 border border-error-300 rounded-lg p-4 mb-4">
                    <h3 className="text-base font-semibold text-error-800 mb-1">Ошибка отправки</h3>
                    <p className="text-sm text-error-700 mb-2">{error}</p>
                    <button onClick={() => setError(null)} className="text-sm text-error-600 underline">
                      Закрыть
                    </button>
                  </div>)}

                <Input label="Ваше имя *" value={formData.name} onChangeText={(value) => setFormData((prev) => ({ ...prev, name: value }))} placeholder="Иван" required/>

                <Input label="Телефон *" value={formData.phone} onChangeText={(value) => setFormData((prev) => ({ ...prev, phone: value }))} placeholder="+7 (999) 123-45-67" type="tel" required/>

                <Input label="Email (необязательно)" value={formData.email || ''} onChangeText={(value) => setFormData((prev) => ({ ...prev, email: value }))} placeholder="ivan@example.com" type="email"/>

                <Input label="Сообщение *" value={formData.message} onChangeText={(value) => setFormData((prev) => ({ ...prev, message: value }))} placeholder="Расскажите о вашем автомобиле или задайте вопрос..." multiline rows={5} required/>

                <Button onClick={handleSubmit} isLoading={isLoading} size="lg" className="mt-2">
                  Отправить сообщение
                </Button>
              </div>)}
          </Card>
        </div>

        <Card className="bg-primary-600 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Почему выбирают нас?</h2>
          <div className="flex flex-col gap-3">
            {['Оценка за 5 минут', 'Честная рыночная цена', 'Моментальная оплата', 'Официальное оформление', 'Работаем с любым состоянием'].map((advantage) => (<div key={advantage} className="flex flex-row items-center gap-3">
                <span className="text-lg text-white font-bold">✓</span>
                <span className="text-base text-white">{advantage}</span>
              </div>))}
          </div>
        </Card>

        <div className="flex flex-row flex-wrap gap-6 mb-6">
          <Card className="flex-1 min-w-[300px] p-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">О компании</h2>
            <p className="text-base text-neutral-600 leading-6 mb-3">
              Мы работаем на рынке выкупа автомобилей более 10 лет. За это время мы
              помогли более 5000 клиентам продать свои автомобили быстро и выгодно.
            </p>
            <p className="text-base text-neutral-600 leading-6 mb-3">
              Наша компания специализируется на выкупе автомобилей всех марок и моделей
              в любом состоянии. Мы работаем честно, быстро и профессионально.
            </p>
            <p className="text-base text-neutral-600 leading-6">
              Наша цель - сделать процесс продажи автомобиля максимально простым и
              выгодным для наших клиентов.
            </p>
          </Card>

          <Card className="flex-1 min-w-[300px] p-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Зоны работы</h2>
            <p className="text-base text-neutral-600 leading-6 mb-4">
              Мы работаем по всей Москве и Московской области. Наш специалист может
              приехать к вам в любое удобное место.
            </p>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2 mt-4">Москва:</h3>
            <p className="text-base text-neutral-600 leading-6 mb-4">
              Все районы и округа. Выезд в течение 1-2 часов.
            </p>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Московская область:</h3>
            <p className="text-base text-neutral-600 leading-6 mb-4">
              Все города и районы МО. Время выезда зависит от удаленности.
            </p>
            <div className="bg-primary-50 rounded-lg p-4 mt-4">
              <p className="text-sm text-info-800 font-medium leading-5">
                💡 Мы можем организовать эвакуатор для транспортировки автомобиля, если
                он не на ходу или находится далеко.
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 text-center">Зоны работы на карте</h2>
          <p className="text-base text-neutral-600 text-center mb-6 max-w-[600px]">
            Мы работаем по всей Москве и Московской области. Нажмите на кнопку для просмотра карты.
          </p>
          <Button onClick={openMap} variant="secondary" className="min-w-[200px]">
            Открыть карту
          </Button>
        </Card>

        <Card className="bg-primary-600 p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">Наши услуги по выкупу автомобилей</h2>
          <p className="text-lg text-primary-100 text-center mb-8 max-w-[800px] mx-auto">
            Свяжитесь с нами для получения консультации по любой из наших услуг. Каждая услуга имеет отдельную страницу с детальной информацией.
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {[
            { title: 'Срочный выкуп', text: 'Выкуп за 2 часа', path: '/services/urgent-buyback' },
            { title: 'Выкуп битых авто', text: 'Любая степень повреждения', path: '/services/damaged-cars' },
            { title: 'Выкуп после ДТП', text: 'Оценка остаточной стоимости', path: '/services/after-accident' },
            { title: 'Выкуп кредитных авто', text: 'Помощь с банком', path: '/services/credit-cars' },
            { title: 'Выкуп премиум авто', text: 'Элитные автомобили', path: '/services/premium-cars' },
            { title: 'Выкуп автомобилей', text: 'Все марки и модели', path: '/services/buyback-cars' },
        ].map((service) => (<button key={service.path} onClick={() => handleLinkPress(service.path)} className="flex-1 min-w-[200px] bg-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-white/20 transition-colors">
                <h3 className="text-base font-semibold text-white mb-2 text-center">{service.title}</h3>
                <p className="text-sm text-primary-100 text-center">{service.text}</p>
              </button>))}
          </div>
        </Card>
      </div>
    </div>);
};
export default Contacts;
