import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { initParallax } from '../lib/parallax';

interface HeroCalculatorData {
  brand: string;
  model: string;
  year: number;
}

const carBrands = [
  'Toyota', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Nissan',
  'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
  'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti'
];

const currentYear = new Date().getFullYear();

const HeroCalculator: React.FC = () => {
  const [formData, setFormData] = useState<HeroCalculatorData>({
    brand: '',
    model: '',
    year: currentYear,
  });
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero calculator
  useEffect(() => {
    if (calculatorRef.current) {
      const cleanup = initParallax(calculatorRef.current, { speed: 0.05, direction: 'up' });
      return cleanup;
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
  }, []);

  const handleShowAmount = useCallback(() => {
    if (!formData.brand || !formData.model || !formData.year) {
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 300);
  }, [formData]);

  const isFormValid = useMemo(() => {
    return formData.brand.length > 0 && formData.model.length > 0 && formData.year > 0;
  }, [formData]);

  return (
    <div ref={calculatorRef} className="bg-white/95 dark:bg-neutral-800/95 rounded-xl p-6 mb-8 shadow-lg glass-morphism-subtle will-change-transform">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-2 heading-gradient">
        Бесплатная оценка автомобиля онлайн
      </h2>
      <p className="text-base text-neutral-600 dark:text-neutral-300 text-center mb-6">
        Выкуп авто по рыночной цене
      </p>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            label="Марка автомобиля"
            value={formData.brand}
            onChangeText={handleBrandChange}
            placeholder="Например: Toyota"
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

        <div>
          <Input
            label="Модель"
            value={formData.model}
            onChangeText={(value) => setFormData(prev => ({ ...prev, model: value }))}
            placeholder="Например: Camry"
          />
        </div>

        <div>
          <Input
            label="Год выпуска"
            value={formData.year.toString()}
            onChangeText={(value) => {
              const year = parseInt(value) || currentYear;
              setFormData(prev => ({ ...prev, year }));
            }}
            type="number"
            placeholder={currentYear.toString()}
          />
        </div>

        <Button
          onClick={handleShowAmount}
          disabled={!isFormValid || isCalculating}
          isLoading={isCalculating}
          size="lg"
        >
          Узнать стоимость →
        </Button>
      </div>
    </div>
  );
};

export default HeroCalculator;
