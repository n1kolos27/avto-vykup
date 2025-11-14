'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneButton from './PhoneButton';
import Button from './ui/Button';
import Input from './ui/Input';
import { trackFormSubmit, trackFormInteraction, trackCTAClick } from '@/lib/analytics/events';
import { trackEvaluationFunnel, trackFormProgress } from '@/lib/analytics/funnels';
import { Goals } from '@/lib/analytics/goals';
import { toast } from '@/lib/toast';
import { APP_CONFIG } from '@/lib/config';
import { getReducedMotionConfig } from '@/lib/utils/accessibility';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiTruck,
  FiCalendar,
  FiActivity,
  FiShield,
  FiPhone,
  FiUser,
  FiLock,
  FiClock,
  FiUsers
} from 'react-icons/fi';

interface FormData {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  phone: string;
  name?: string;
}

// Popular car brands for autocomplete
const carBrands = [
  'Toyota', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Nissan',
  'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
  'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti'
];

// Popular models by brand (simplified)
const carModels: Record<string, string[]> = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Highlander', 'Prius'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'A-Class'],
  'BMW': ['3 Series', '5 Series', 'X5', 'X3', '7 Series', '1 Series'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3', 'A8'],
  'Volkswagen': ['Passat', 'Tiguan', 'Golf', 'Polo', 'Touareg', 'Jetta'],
};

export default function CarEvaluationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [modelSuggestions, setModelSuggestions] = useState<string[]>([]);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  const [brandHighlightedIndex, setBrandHighlightedIndex] = useState(-1);
  const [modelHighlightedIndex, setModelHighlightedIndex] = useState(-1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>();

  const watchedBrand = watch('brand');
  const watchedModel = watch('model');
  const watchedYear = watch('year');
  const watchedMileage = watch('mileage');
  const watchedCondition = watch('condition');
  const watchedPhone = watch('phone');
  const watchedName = watch('name');

  // Calculate form progress
  const formProgress = useMemo(() => {
    let filled = 0;
    if (watchedBrand) filled++;
    if (watchedModel) filled++;
    if (watchedYear) filled++;
    if (watchedMileage) filled++;
    if (watchedCondition) filled++;
    if (watchedPhone) filled++;
    const progress = Math.round((filled / 6) * 100);

    // Track form progress for analytics
    if (filled > 0 && typeof window !== 'undefined') {
      trackFormProgress('evaluation', progress);
    }

    return progress;
  }, [watchedBrand, watchedModel, watchedYear, watchedMileage, watchedCondition, watchedPhone]);

  // Track form start (only once when user starts filling)
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  useEffect(() => {
    if (!hasTrackedStart && (watchedBrand || watchedModel || watchedYear || watchedMileage || watchedCondition || watchedPhone)) {
      trackEvaluationFunnel('form_start');
      setHasTrackedStart(true);
    }
  }, [watchedBrand, watchedModel, watchedYear, watchedMileage, watchedCondition, watchedPhone, hasTrackedStart]);

  const phone1 = APP_CONFIG.PHONE_1;

  // Handle brand input with autocomplete
  const handleBrandChange = useCallback((value: string) => {
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
  }, []);

  // Handle model input with autocomplete
  const handleModelChange = useCallback((value: string, brand: string) => {
    if (value.length > 0 && brand && carModels[brand]) {
      const filtered = carModels[brand].filter(model =>
        model.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setModelSuggestions(filtered);
      setShowModelSuggestions(true);
    } else {
      setModelSuggestions([]);
      setShowModelSuggestions(false);
    }
  }, []);

  // Handle autocomplete when brand changes
  useEffect(() => {
    if (watchedBrand) {
      handleBrandChange(watchedBrand);
    }
  }, [watchedBrand, handleBrandChange]);

  // Handle autocomplete when model changes
  useEffect(() => {
    if (watchedModel && watchedBrand) {
      handleModelChange(watchedModel, watchedBrand);
    }
  }, [watchedModel, watchedBrand, handleModelChange]);

  // Create field props for brand (memoized)
  const brandFieldProps = useMemo(() => {
    const field = register('brand', {
      required: 'Укажите марку автомобиля',
    });
    return {
      ...field,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e);
        handleBrandChange(e.target.value);
        trackFormInteraction('brand', 'change');
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        field.onBlur(e);
        trackFormInteraction('brand', 'blur');
      },
      onFocus: () => {
        if (watchedBrand) handleBrandChange(watchedBrand);
        trackFormInteraction('brand', 'focus');
      },
    };
  }, [register, watchedBrand, handleBrandChange]);

  // Create field props for model (memoized)
  const modelFieldProps = useMemo(() => {
    const field = register('model', {
      required: 'Укажите модель',
    });
    return {
      ...field,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e);
        handleModelChange(e.target.value, watchedBrand || '');
        trackFormInteraction('model', 'change');
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        field.onBlur(e);
        trackFormInteraction('model', 'blur');
      },
      onFocus: () => {
        if (watchedModel && watchedBrand) handleModelChange(watchedModel, watchedBrand);
        trackFormInteraction('model', 'focus');
      },
    };
  }, [register, watchedBrand, watchedModel, handleModelChange]);



  const onSubmit = useCallback(async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    // Track form submission start
    trackEvaluationFunnel('form_submit');

    try {
      const response = await fetch('/api/evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        // Добавляем timeout для fetch
        signal: AbortSignal.timeout(30000), // 30 секунд
      });

      // Проверка статуса ответа
      if (!response.ok) {
        const result = await response.json().catch(() => ({
          error: `Ошибка ${response.status}: ${response.statusText}`,
        }));
        throw new Error(result.error || `Ошибка ${response.status}`);
      }

      const result = await response.json();

      // Проверка успешности операции
      if (!result.success) {
        throw new Error(result.error || 'Ошибка при отправке заявки');
      }

      trackFormSubmit('evaluation');
      Goals.FORM_SUBMIT('evaluation');
      trackEvaluationFunnel('conversion', { success: true });
      toast.success(result.message || 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      setIsSubmitted(true);
      reset();
      setShowBrandSuggestions(false);
      setShowModelSuggestions(false);
      setBrandHighlightedIndex(-1);
      setModelHighlightedIndex(-1);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      // Обработка различных типов ошибок
      let errorMessage = 'Произошла ошибка. Попробуйте позже.';

      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          errorMessage = 'Превышено время ожидания. Проверьте подключение к интернету и попробуйте снова.';
        } else if (error.message.includes('429') || error.message.includes('rate limit')) {
          errorMessage = 'Слишком много запросов. Пожалуйста, подождите немного и попробуйте снова.';
        } else {
          errorMessage = error.message;
        }
      }

      console.error('Error submitting form:', error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  const conditions = useMemo(() => [
    { value: 'excellent', label: 'Отличное', icon: '✨' },
    { value: 'good', label: 'Хорошее', icon: '👍' },
    { value: 'satisfactory', label: 'Удовлетворительное', icon: '✅' },
    { value: 'needs_repair', label: 'Требует ремонта', icon: '🔧' },
  ], []);

  // Get today's evaluation count (mock data)
  const todayEvaluations = 47;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={getReducedMotionConfig({ opacity: 0, y: 20 }, { opacity: 0 })}
        animate={getReducedMotionConfig({ opacity: 1, y: 0 }, { opacity: 1 })}
        transition={getReducedMotionConfig({ duration: 0.5, ease: 'easeOut' }, { duration: 0 })}
        className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        <motion.div
          initial={getReducedMotionConfig({ opacity: 0, y: -10 }, { opacity: 0 })}
          animate={getReducedMotionConfig({ opacity: 1, y: 0 }, { opacity: 1 })}
          transition={getReducedMotionConfig({ duration: 0.5, delay: 0.1 }, { duration: 0 })}
          className="mb-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
            Быстрая оценка вашего авто
          </h3>
          <p className="text-gray-600">Заполните форму и получите оценку за 5 минут</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Прогресс заполнения</span>
            <span className="text-sm font-semibold text-primary-600">{formProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${formProgress}%` }}
              transition={{ duration: 0.3 }}
              className="bg-primary-600 h-2.5 rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={getReducedMotionConfig({ opacity: 0, scale: 0.95 }, { opacity: 0 })}
              animate={getReducedMotionConfig({ opacity: 1, scale: 1 }, { opacity: 1 })}
              exit={getReducedMotionConfig({ opacity: 0, scale: 0.95 }, { opacity: 0 })}
              transition={getReducedMotionConfig({ duration: 0.3 }, { duration: 0 })}
              className="bg-green-50 border-2 border-green-200 text-green-800 p-6 rounded-lg mb-6"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start space-x-3">
                <FiCheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <p className="font-semibold text-lg">Спасибо! Ваша заявка отправлена.</p>
                  <p className="text-sm mt-1">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={getReducedMotionConfig({ opacity: 0, scale: 0.95 }, { opacity: 0 })}
              animate={getReducedMotionConfig({ opacity: 1, scale: 1 }, { opacity: 1 })}
              exit={getReducedMotionConfig({ opacity: 0, scale: 0.95 }, { opacity: 0 })}
              transition={getReducedMotionConfig({ duration: 0.3 }, { duration: 0 })}
              className="bg-red-50 border-2 border-red-200 text-red-800 p-6 rounded-lg mb-6"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <FiAlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                  <div>
                    <p className="font-semibold text-lg">Ошибка отправки</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                  aria-label="Закрыть"
                >
                  <FiX size={20} />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!isSubmitted && (
          <motion.form
            initial={getReducedMotionConfig({ opacity: 0 }, { opacity: 0 })}
            animate={getReducedMotionConfig({ opacity: 1 }, { opacity: 1 })}
            transition={getReducedMotionConfig({ duration: 0.5, delay: 0.2 }, { duration: 0 })}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
            aria-label="Форма оценки автомобиля"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <Input
                  label="Марка автомобиля"
                  {...brandFieldProps}
                  placeholder="Например: Toyota"
                  error={errors.brand?.message}
                  required
                  leftIcon={<FiTruck className="text-gray-400" />}
                  helperText="Начните вводить название марки"
                />
                {showBrandSuggestions && brandSuggestions.length > 0 && (
                  <div
                    role="listbox"
                    aria-label="Предложения марок автомобилей"
                    aria-activedescendant={brandHighlightedIndex >= 0 ? `brand-option-${brandHighlightedIndex}` : undefined}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setBrandHighlightedIndex((prev) =>
                          prev < brandSuggestions.length - 1 ? prev + 1 : 0
                        );
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setBrandHighlightedIndex((prev) =>
                          prev > 0 ? prev - 1 : brandSuggestions.length - 1
                        );
                      } else if (e.key === 'Enter' && brandHighlightedIndex >= 0) {
                        e.preventDefault();
                        const selectedBrand = brandSuggestions[brandHighlightedIndex];
                        setValue('brand', selectedBrand);
                        handleBrandChange(selectedBrand);
                        setShowBrandSuggestions(false);
                        setBrandHighlightedIndex(-1);
                      } else if (e.key === 'Escape') {
                        setShowBrandSuggestions(false);
                        setBrandHighlightedIndex(-1);
                      }
                    }}
                  >
                    {brandSuggestions.map((brand, idx) => (
                      <button
                        key={idx}
                        id={`brand-option-${idx}`}
                        type="button"
                        role="option"
                        aria-selected={watchedBrand === brand || idx === brandHighlightedIndex}
                        onClick={() => {
                          setValue('brand', brand);
                          handleBrandChange(brand);
                          setShowBrandSuggestions(false);
                          setBrandHighlightedIndex(-1);
                        }}
                        onMouseEnter={() => setBrandHighlightedIndex(idx)}
                        className={`w-full text-left px-4 py-2 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors min-h-[44px] ${
                          idx === brandHighlightedIndex ? 'bg-primary-50' : ''
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  label="Модель"
                  {...modelFieldProps}
                  placeholder="Например: Camry"
                  error={errors.model?.message}
                  required
                  leftIcon={<FiTruck className="text-gray-400" />}
                  helperText={watchedBrand ? "Начните вводить модель" : "Сначала укажите марку"}
                  disabled={!watchedBrand}
                />
                {showModelSuggestions && modelSuggestions.length > 0 && (
                  <div
                    role="listbox"
                    aria-label="Предложения моделей автомобилей"
                    aria-activedescendant={modelHighlightedIndex >= 0 ? `model-option-${modelHighlightedIndex}` : undefined}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setModelHighlightedIndex((prev) =>
                          prev < modelSuggestions.length - 1 ? prev + 1 : 0
                        );
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setModelHighlightedIndex((prev) =>
                          prev > 0 ? prev - 1 : modelSuggestions.length - 1
                        );
                      } else if (e.key === 'Enter' && modelHighlightedIndex >= 0) {
                        e.preventDefault();
                        const selectedModel = modelSuggestions[modelHighlightedIndex];
                        setValue('model', selectedModel);
                        handleModelChange(selectedModel, watchedBrand || '');
                        setShowModelSuggestions(false);
                        setModelHighlightedIndex(-1);
                      } else if (e.key === 'Escape') {
                        setShowModelSuggestions(false);
                        setModelHighlightedIndex(-1);
                      }
                    }}
                  >
                    {modelSuggestions.map((model, idx) => (
                      <button
                        key={idx}
                        id={`model-option-${idx}`}
                        type="button"
                        role="option"
                        aria-selected={watchedModel === model || idx === modelHighlightedIndex}
                        onClick={() => {
                          setValue('model', model);
                          handleModelChange(model, watchedBrand || '');
                          setShowModelSuggestions(false);
                          setModelHighlightedIndex(-1);
                        }}
                        onMouseEnter={() => setModelHighlightedIndex(idx)}
                        className={`w-full text-left px-4 py-2 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors min-h-[44px] ${
                          idx === modelHighlightedIndex ? 'bg-primary-50' : ''
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Input
                label="Год выпуска"
                type="number"
                {...register('year', {
                  required: 'Укажите год выпуска',
                  min: { value: 1950, message: 'Год должен быть не ранее 1950' },
                  max: { value: new Date().getFullYear() + 1, message: 'Неверный год' },
                  valueAsNumber: true,
                })}
                placeholder="2020"
                error={errors.year?.message}
                required
                leftIcon={<FiCalendar className="text-gray-400" />}
                helperText={`Например: ${new Date().getFullYear() - 5}`}
              />

              <Input
                label="Пробег (км)"
                type="number"
                {...register('mileage', {
                  required: 'Укажите пробег',
                  min: { value: 0, message: 'Пробег не может быть отрицательным' },
                  valueAsNumber: true,
                })}
                placeholder="50000"
                error={errors.mileage?.message}
                required
                leftIcon={<FiActivity className="text-gray-400" />}
                helperText="Укажите реальный пробег"
              />

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Состояние <span className="text-red-500" aria-label="обязательное поле">*</span>
                </label>
                <select
                  id="condition"
                  {...register('condition', { required: 'Выберите состояние' })}
                  aria-invalid={errors.condition ? 'true' : undefined}
                  aria-describedby={errors.condition ? 'condition-error' : undefined}
                  aria-required="true"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white min-h-[44px] ${
                    errors.condition ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Выберите состояние</option>
                  {conditions.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {cond.icon} {cond.label}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <motion.p
                    id="condition-error"
                    role="alert"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <FiAlertCircle size={14} aria-hidden="true" />
                    {errors.condition.message}
                  </motion.p>
                )}
              </div>

              <Input
                label="Ваш телефон"
                type="tel"
                {...register('phone', {
                  required: 'Укажите телефон',
                  pattern: {
                    value: /^[\d\s\-\+\(\)]+$/,
                    message: 'Неверный формат телефона',
                  },
                })}
                placeholder="+7 (999) 123-45-67"
                error={errors.phone?.message}
                required
                leftIcon={<FiPhone className="text-gray-400" />}
                helperText="Мы свяжемся с вами в течение 5 минут"
              />
            </div>

            <Input
              label="Ваше имя (необязательно)"
              {...register('name')}
              placeholder="Иван"
              leftIcon={<FiUser className="text-gray-400" />}
              helperText="Для более персонализированного общения"
            />

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-start space-x-3">
              <FiLock className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">Ваши данные защищены</p>
                <p>Мы гарантируем конфиденциальность и не передаем ваши данные третьим лицам</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                isLoading={isLoading}
                className="flex-1"
                size="lg"
                onClick={() => trackCTAClick('form_submit', 'evaluation_form')}
              >
                Получить оценку
              </Button>
              <PhoneButton phone={phone1} />
            </div>
          </motion.form>
        )}
      </motion.div>

      {/* Social Proof Sidebar */}
      <motion.div
        initial={getReducedMotionConfig({ opacity: 0, x: 20 }, { opacity: 0 })}
        animate={getReducedMotionConfig({ opacity: 1, x: 0 }, { opacity: 1 })}
        transition={getReducedMotionConfig({ duration: 0.5, delay: 0.3 }, { duration: 0 })}
        className="space-y-4"
      >
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary-600 rounded-full p-2">
              <FiUsers className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{todayEvaluations}</p>
              <p className="text-sm text-gray-600">оценок сегодня</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Присоединяйтесь к тысячам довольных клиентов
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <FiClock className="text-primary-600" size={18} />
            <span>Быстро и удобно</span>
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
              <span>Оценка за 5 минут</span>
            </li>
            <li className="flex items-start space-x-2">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
              <span>Без обязательств</span>
            </li>
            <li className="flex items-start space-x-2">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
              <span>Честная рыночная цена</span>
            </li>
            <li className="flex items-start space-x-2">
              <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
              <span>Конфиденциально</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <FiShield className="text-primary-200" size={24} />
            <h4 className="font-semibold text-lg">Гарантии</h4>
          </div>
          <p className="text-sm text-primary-100">
            Мы гарантируем честную оценку и безопасность сделки. Более 5000 довольных клиентов уже продали свои автомобили через нас.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
