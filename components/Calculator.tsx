'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiInfo } from 'react-icons/fi';
import { APP_CONFIG } from '@/lib/config';

interface CalculatorFormData {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  engineVolume?: number;
  transmission?: string;
  drive?: string;
}

interface CalculationResult {
  basePrice: number;
  conditionMultiplier: number;
  mileageMultiplier: number;
  ageMultiplier: number;
  finalPrice: number;
}

export default function Calculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    defaultValues: {
      condition: 'good',
      transmission: 'automatic',
      drive: 'front',
    },
  });

  const formData = watch();

  // Базовая стоимость (примерная, можно заменить на реальные данные)
  const basePrices: Record<string, number> = {
    toyota: 1500000,
    bmw: 2000000,
    mercedes: 2200000,
    audi: 2100000,
    volkswagen: 1200000,
    default: 1000000,
  };

  useEffect(() => {
    if (
      formData.brand &&
      formData.model &&
      formData.year &&
      formData.mileage !== undefined &&
      formData.condition
    ) {
      calculatePrice();
    } else {
      setResult(null);
    }
  }, [formData]);

  const calculatePrice = () => {
    const brand = formData.brand.toLowerCase();
    const basePrice =
      basePrices[brand] || basePrices[Object.keys(basePrices).find((k) => brand.includes(k)) || 'default'] || basePrices.default;

    // Множитель состояния
    const conditionMultipliers: Record<string, number> = {
      excellent: 1.0,
      good: 0.85,
      satisfactory: 0.7,
      needs_repair: 0.5,
    };
    const conditionMultiplier = conditionMultipliers[formData.condition] || 0.85;

    // Множитель пробега (чем больше пробег, тем меньше цена)
    const avgMileagePerYear = 15000;
    const expectedMileage = (new Date().getFullYear() - formData.year) * avgMileagePerYear;
    const mileageRatio = formData.mileage / Math.max(expectedMileage, 1);
    const mileageMultiplier = Math.max(0.5, Math.min(1.0, 1.0 - (mileageRatio - 1) * 0.3));

    // Множитель возраста (амортизация)
    const age = new Date().getFullYear() - formData.year;
    const ageMultiplier = Math.max(0.3, 1.0 - age * 0.05);

    const finalPrice = Math.round(basePrice * conditionMultiplier * mileageMultiplier * ageMultiplier);

    setResult({
      basePrice,
      conditionMultiplier,
      mileageMultiplier,
      ageMultiplier,
      finalPrice,
    });
  };

  const conditions = [
    { value: 'excellent', label: 'Отличное' },
    { value: 'good', label: 'Хорошее' },
    { value: 'satisfactory', label: 'Удовлетворительное' },
    { value: 'needs_repair', label: 'Требует ремонта' },
  ];

  const transmissions = [
    { value: 'automatic', label: 'Автоматическая' },
    { value: 'manual', label: 'Механическая' },
    { value: 'robot', label: 'Робот' },
    { value: 'variator', label: 'Вариатор' },
  ];

  const drives = [
    { value: 'front', label: 'Передний' },
    { value: 'rear', label: 'Задний' },
    { value: 'full', label: 'Полный' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-800"
      >
        Калькулятор стоимости автомобиля
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Марка автомобиля *
            </label>
            <input
              type="text"
              {...register('brand', { required: 'Укажите марку' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              placeholder="Например: Toyota"
            />
            {errors.brand && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1 flex items-center gap-1"
              >
                {errors.brand.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Модель *
            </label>
            <input
              type="text"
              {...register('model', { required: 'Укажите модель' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              placeholder="Например: Camry"
            />
            {errors.model && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.model.message}
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Год выпуска *
              </label>
              <input
                type="number"
                {...register('year', {
                  required: 'Укажите год',
                  min: 1950,
                  max: new Date().getFullYear() + 1,
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                placeholder="2020"
              />
              {errors.year && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.year.message}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пробег (км) *
              </label>
              <input
                type="number"
                {...register('mileage', {
                  required: 'Укажите пробег',
                  min: 0,
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                placeholder="50000"
              />
              {errors.mileage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.mileage.message}
                </motion.p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Состояние *
            </label>
            <select
              {...register('condition', { required: 'Выберите состояние' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white"
            >
              {conditions.map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Объем двигателя (л)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('engineVolume')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                placeholder="2.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                КПП
              </label>
              <select
                {...register('transmission')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white"
              >
                {transmissions.map((trans) => (
                  <option key={trans.value} value={trans.value}>
                    {trans.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Привод
            </label>
            <select
              {...register('drive')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white"
            >
              {drives.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 p-6 md:p-8 rounded-xl border-2 border-primary-200 shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="bg-primary-600 p-2 rounded-lg shadow-md">
                  <FiDollarSign className="text-white text-2xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Предварительная оценка
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="mb-6"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-3">
                  {result.finalPrice.toLocaleString('ru-RU')} ₽
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  * Это предварительная оценка. Точную стоимость определит наш специалист при осмотре.
                </p>
              </motion.div>

              <motion.button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 transition-colors duration-300 group"
                whileHover={{ x: 4 }}
              >
                <motion.div
                  animate={{ rotate: showDetails ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiInfo />
                </motion.div>
                <span>{showDetails ? 'Скрыть детали' : 'Показать детали расчета'}</span>
              </motion.button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white p-5 rounded-lg space-y-5 text-sm shadow-inner">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600">Базовая стоимость:</span>
                        <span className="font-semibold text-gray-800">{result.basePrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Состояние:</span>
                          <span className="font-semibold text-primary-600">{Math.round(result.conditionMultiplier * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.conditionMultiplier * 100}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full shadow-sm"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Пробег:</span>
                          <span className="font-semibold text-primary-600">{Math.round(result.mileageMultiplier * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.mileageMultiplier * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full shadow-sm"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Возраст:</span>
                          <span className="font-semibold text-primary-600">{Math.round(result.ageMultiplier * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.ageMultiplier * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full shadow-sm"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div className="border-t border-primary-200 pt-4 flex justify-between font-semibold text-base">
                        <span className="text-gray-800">Итоговая стоимость:</span>
                        <span className="text-primary-600">{result.finalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 space-y-3">
                <motion.a
                  href="#contact-form"
                  className="w-full bg-gradient-to-br from-primary-600 to-primary-700 text-white text-center px-6 py-3 md:py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-h-[44px] md:min-h-[52px] flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Получить точную оценку
                </motion.a>
                <motion.a
                  href={`tel:${APP_CONFIG.PHONE_1}`}
                  className="w-full bg-white text-primary-600 text-center px-6 py-3 md:py-4 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-all duration-300 min-h-[44px] md:min-h-[52px] flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Позвонить нам
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-8 md:p-12 rounded-xl border-2 border-dashed border-gray-300 text-center"
            >
              <p className="text-gray-500 leading-relaxed">
                Заполните форму слева, чтобы получить предварительную оценку стоимости вашего автомобиля
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

