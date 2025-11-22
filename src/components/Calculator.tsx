import React, { useState, useEffect, useCallback } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { APP_CONFIG } from '../lib/config/index.js';

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

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState<CalculatorFormData>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    condition: 'good',
    transmission: 'automatic',
    drive: 'front',
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CalculatorFormData, string>>>({});

  const calculatePrice = useCallback(() => {
    // Базовая стоимость (примерная)
    const basePrices: Record<string, number> = {
      toyota: 1500000,
      bmw: 2000000,
      mercedes: 2200000,
      audi: 2100000,
      volkswagen: 1200000,
      default: 1000000,
    };

    const brand = formData.brand.toLowerCase();
    const basePrice =
      basePrices[brand] ||
      basePrices[Object.keys(basePrices).find((k) => brand.includes(k)) || 'default'] ||
      basePrices.default;

    // Множитель состояния
    const conditionMultipliers: Record<string, number> = {
      excellent: 1.0,
      good: 0.85,
      satisfactory: 0.7,
      needs_repair: 0.5,
    };
    const conditionMultiplier = conditionMultipliers[formData.condition] || 0.85;

    // Множитель пробега
    const avgMileagePerYear = 15000;
    const expectedMileage = (new Date().getFullYear() - formData.year) * avgMileagePerYear;
    const mileageRatio = formData.mileage / Math.max(expectedMileage, 1);
    const mileageMultiplier = Math.max(0.5, Math.min(1.0, 1.0 - (mileageRatio - 1) * 0.3));

    // Множитель возраста
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
  }, [formData]);

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
  }, [formData, calculatePrice]);

  const updateField = (field: keyof CalculatorFormData, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <Card className="p-6 m-4">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
        Калькулятор стоимости автомобиля
      </h2>

      <div className="flex flex-col">
        <div className="mb-6">
          <div className="mb-4">
            <Input
              label="Марка автомобиля *"
              value={formData.brand}
              onChangeText={(value) => updateField('brand', value)}
              placeholder="Например: Toyota"
              error={errors.brand}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Модель *"
              value={formData.model}
              onChangeText={(value) => updateField('model', value)}
              placeholder="Например: Camry"
              error={errors.model}
            />
          </div>

          <div className="flex flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                label="Год выпуска *"
                value={formData.year.toString()}
                onChangeText={(value) => updateField('year', parseInt(value) || 0)}
                type="number"
                placeholder="2020"
                error={errors.year}
              />
            </div>

            <div className="flex-1">
              <Input
                label="Пробег (км) *"
                value={formData.mileage.toString()}
                onChangeText={(value) => updateField('mileage', parseInt(value) || 0)}
                type="number"
                placeholder="50000"
                error={errors.mileage}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2 block">Состояние *</label>
            <div className="flex flex-row flex-wrap gap-2">
              {conditions.map((cond) => (
                <button
                  key={cond.value}
                  className={`px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${
                    formData.condition === cond.value
                      ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                      : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'
                  }`}
                  onClick={() => updateField('condition', cond.value)}
                >
                  <span className="text-sm">{cond.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                label="Объем двигателя (л)"
                value={formData.engineVolume?.toString() || ''}
                onChangeText={(value) => {
                  const numValue = parseFloat(value);
                  updateField('engineVolume', isNaN(numValue) ? undefined : numValue);
                }}
                type="number"
                step="0.1"
                placeholder="2.0"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-semibold text-neutral-700 mb-2 block">КПП</label>
              <div className="flex flex-row flex-wrap gap-2">
                {transmissions.map((trans) => (
                  <button
                    key={trans.value}
                    className={`px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${
                      formData.transmission === trans.value
                        ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                        : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'
                    }`}
                    onClick={() => updateField('transmission', trans.value)}
                  >
                    <span className="text-sm">{trans.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-neutral-700 mb-2 block">Привод</label>
            <div className="flex flex-row flex-wrap gap-2">
              {drives.map((d) => (
                <button
                  key={d.value}
                  className={`px-4 py-2.5 rounded-lg border min-h-[44px] flex items-center justify-center transition-colors ${
                    formData.drive === d.value
                      ? 'bg-primary-600 border-primary-600 text-white font-semibold'
                      : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'
                  }`}
                  onClick={() => updateField('drive', d.value)}
                >
                  <span className="text-sm">{d.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {result ? (
          <div className="bg-primary-50 p-6 rounded-xl border-2 border-primary-200 mt-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Предварительная оценка</h3>
            <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-3">
              {result.finalPrice.toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4 leading-5">
              * Это предварительная оценка. Точную стоимость определит наш специалист при осмотре.
            </p>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-3 mb-4 text-center"
            >
              <span className="text-sm font-semibold text-primary-600">
                {showDetails ? 'Скрыть детали' : 'Показать детали расчета'}
              </span>
            </button>

            {showDetails && (
              <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg mb-4">
                <div className="flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">Базовая стоимость:</span>
                  <span className="text-sm font-semibold text-primary-600">
                    {result.basePrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">Состояние:</span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {Math.round(result.conditionMultiplier * 100)}%
                  </span>
                </div>
                <div className="flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">Пробег:</span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {Math.round(result.mileageMultiplier * 100)}%
                  </span>
                </div>
                <div className="flex flex-row justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">Возраст:</span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {Math.round(result.ageMultiplier * 100)}%
                  </span>
                </div>
                <div className="flex flex-row justify-between pt-3 mt-2 border-t-2 border-primary-200 dark:border-primary-800">
                  <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Итоговая стоимость:</span>
                  <span className="text-base font-semibold text-primary-600">
                    {result.finalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button
                onClick={scrollToForm}
                className="mb-3"
              >
                Получить точную оценку
              </Button>
              <Button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = `tel:${APP_CONFIG.PHONE_1}`;
                  }
                }}
                variant="secondary"
              >
                Позвонить: {APP_CONFIG.PHONE_1}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 mt-6 flex items-center justify-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center leading-5">
              Заполните форму, чтобы получить предварительную оценку стоимости вашего автомобиля
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Calculator;
