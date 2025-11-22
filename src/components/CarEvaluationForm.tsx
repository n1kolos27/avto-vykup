import React, { useState, useCallback, useMemo } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import { toast } from '../lib/toast.js';

interface FormData {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  phone: string;
  name?: string;
}

const carBrands = [
  'Toyota', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Nissan',
  'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
  'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti'
];

const conditions = [
  { value: 'excellent', label: 'Отличное' },
  { value: 'good', label: 'Хорошее' },
  { value: 'satisfactory', label: 'Удовлетворительное' },
  { value: 'needs_repair', label: 'Требует ремонта' },
];

const currentYear = new Date().getFullYear();

const CarEvaluationForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    brand: '',
    model: '',
    year: currentYear,
    mileage: 0,
    condition: 'good',
    phone: '',
    name: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const validateField = useCallback((field: keyof FormData, value: any): string | undefined => {
    switch (field) {
      case 'brand':
        return !value ? 'Введите марку автомобиля' : undefined;
      case 'model':
        return !value ? 'Введите модель' : undefined;
      case 'year':
        return !value || value < 1900 || value > currentYear + 1 ? 'Введите корректный год' : undefined;
      case 'mileage':
        return !value || value < 0 ? 'Введите корректный пробег' : undefined;
      case 'phone':
        return !value || value.length < 10 ? 'Введите корректный номер телефона' : undefined;
      default:
        return undefined;
    }
  }, []);

  const handleBrandChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, brand: value }));
    if (value.length > 0) {
      const filtered = carBrands.filter(brand =>
        brand.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setBrandSuggestions(filtered);
      setShowBrandSuggestions(true);
    } else {
      setBrandSuggestions([]);
      setShowBrandSuggestions(false);
    }
    
    // Real-time validation
    if (touched.brand) {
      const error = validateField('brand', value);
      setErrors(prev => ({ ...prev, brand: error }));
    }
  }, [touched.brand, validateField]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.brand) newErrors.brand = 'Введите марку автомобиля';
    if (!formData.model) newErrors.model = 'Введите модель';
    if (!formData.year || formData.year < 1900 || formData.year > currentYear + 1) {
      newErrors.year = 'Введите корректный год';
    }
    if (!formData.mileage || formData.mileage < 0) {
      newErrors.mileage = 'Введите корректный пробег';
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    setIsLoading(true);
    try {
      // Получаем CSRF токен
      const { getCSRFToken } = await import('../lib/csrf.js');
      const csrfToken = await getCSRFToken();

      const response = await fetch('/api/evaluation', {
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
        
        const retryResponse = await fetch('/api/evaluation', {
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
        if (!retryResponse.ok && !result.success) {
          toast.error(result.message || 'Ошибка при отправке заявки');
          return;
        }
      }

      if (result.success) {
        setIsSubmitted(true);
        toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        setFormData({
          brand: '',
          model: '',
          year: currentYear,
          mileage: 0,
          condition: 'good',
          phone: '',
          name: '',
        });
      } else {
        toast.error(result.message || 'Ошибка при отправке заявки');
      }
    } catch {
      toast.error('Ошибка при отправке заявки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const formProgress = useMemo(() => {
    let filled = 0;
    if (formData.brand) filled++;
    if (formData.model) filled++;
    if (formData.year) filled++;
    if (formData.mileage) filled++;
    if (formData.condition) filled++;
    if (formData.phone) filled++;
    return Math.round((filled / 6) * 100);
  }, [formData]);

  if (isSubmitted) {
    return (
      <Card className="p-8 flex flex-col items-center">
        <span className="text-6xl text-success-500 mb-4">✓</span>
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">Заявка отправлена!</h3>
        <p className="text-base text-neutral-600 dark:text-neutral-300 text-center mb-6">
          Мы свяжемся с вами в ближайшее время по телефону {formData.phone}
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Отправить еще одну заявку
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 m-4 md:p-8 md:m-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Оценка автомобиля</h3>
        <p className="text-base text-neutral-600 dark:text-neutral-300 mb-4">Заполните форму и получите оценку за 5 минут</p>
        {formProgress > 0 && (
          <div className="relative">
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${formProgress}%` }}
                data-progress={formProgress}
                data-csp-inline="width"
                role="progressbar"
                aria-valuenow={formProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Прогресс заполнения формы: ${formProgress}%`}
              />
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block">
              Заполнено: {formProgress}%
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="mb-4 relative">
          <Input
            label="Марка автомобиля"
            value={formData.brand}
            onChangeText={handleBrandChange}
            onBlur={() => {
              setTouched(prev => ({ ...prev, brand: true }));
              const error = validateField('brand', formData.brand);
              setErrors(prev => ({ ...prev, brand: error }));
            }}
            placeholder="Например: Toyota"
            error={errors.brand}
            success={touched.brand && !errors.brand && formData.brand.length > 0}
            floatingLabel
            required
          />
          {showBrandSuggestions && brandSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 mt-1 z-10 shadow-md">
              {brandSuggestions.map((brand) => (
                <button
                  key={brand}
                  className="p-3 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 w-full text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, brand }));
                    setShowBrandSuggestions(false);
                  }}
                >
                  <span className="text-base text-neutral-900 dark:text-neutral-100">{brand}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <Input
            label="Модель"
            value={formData.model}
            onChangeText={(value) => {
              setFormData(prev => ({ ...prev, model: value }));
              if (touched.model) {
                const error = validateField('model', value);
                setErrors(prev => ({ ...prev, model: error }));
              }
            }}
            onBlur={() => {
              setTouched(prev => ({ ...prev, model: true }));
              const error = validateField('model', formData.model);
              setErrors(prev => ({ ...prev, model: error }));
            }}
            placeholder="Например: Camry"
            error={errors.model}
            success={touched.model && !errors.model && formData.model.length > 0}
            floatingLabel
            required
          />
        </div>

        <div className="flex flex-row gap-3 mb-4">
          <div className="flex-1">
            <Input
              label="Год выпуска"
              value={formData.year.toString()}
              onChangeText={(value) => setFormData(prev => ({ ...prev, year: parseInt(value) || currentYear }))}
              type="number"
              placeholder={currentYear.toString()}
              error={errors.year}
              floatingLabel
              required
            />
          </div>
          <div className="flex-1">
            <Input
              label="Пробег (км)"
              value={formData.mileage.toString()}
              onChangeText={(value) => setFormData(prev => ({ ...prev, mileage: parseInt(value) || 0 }))}
              type="number"
              placeholder="0"
              error={errors.mileage}
              floatingLabel
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2 block">Состояние автомобиля</label>
          <div className="flex flex-row flex-wrap gap-2">
            {conditions.map((condition) => (
              <button
                key={condition.value}
                className={`px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${
                  formData.condition === condition.value
                    ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                    : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, condition: condition.value }))}
              >
                <span className="text-sm">{condition.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Input
            label="Ваше имя"
            value={formData.name || ''}
            onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
            placeholder="Иван"
            error={errors.name}
            floatingLabel
          />
        </div>

        <div className="mb-4">
          <Input
            label="Телефон"
            value={formData.phone}
            onChangeText={(value) => {
              setFormData(prev => ({ ...prev, phone: value }));
              if (touched.phone) {
                const error = validateField('phone', value);
                setErrors(prev => ({ ...prev, phone: error }));
              }
            }}
            onBlur={() => {
              setTouched(prev => ({ ...prev, phone: true }));
              const error = validateField('phone', formData.phone);
              setErrors(prev => ({ ...prev, phone: error }));
            }}
            placeholder="+7 (999) 123-45-67"
            type="tel"
            error={errors.phone}
            success={touched.phone && !errors.phone && formData.phone.length >= 10}
            floatingLabel
            required
          />
        </div>

        <Button
          onClick={onSubmit}
          isLoading={isLoading}
          disabled={isLoading || formProgress < 100}
          size="lg"
          className="mt-2"
        >
          Получить оценку
        </Button>
      </div>
    </Card>
  );
};

export default CarEvaluationForm;
