'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

interface HeroCalculatorData {
  brand: string;
  model: string;
  year: number;
}

// Popular car brands for autocomplete
const carBrands = [
  'Toyota', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Nissan',
  'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus', 'Volvo', 'Skoda', 'Renault',
  'Peugeot', 'Citroen', 'Opel', 'Chevrolet', 'Mitsubishi', 'Subaru', 'Infiniti'
];

// Generate years from 1990 to current year + 1
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

export default function HeroCalculator() {
  const [formData, setFormData] = useState<HeroCalculatorData>({
    brand: '',
    model: '',
    year: currentYear,
  });
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

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
    // Scroll to evaluation form
    setTimeout(() => {
      const element = document.getElementById('evaluation');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsCalculating(false);
    }, 300);
  }, [formData]);

  const isFormValid = useMemo(() => {
    return formData.brand.length > 0 && formData.model.length > 0 && formData.year > 0;
  }, [formData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8 mb-8"
    >
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
        Бесплатная оценка автомобиля онлайн
      </h3>
      <p className="text-sm md:text-base text-gray-600 mb-6 text-center">
        Выкуп авто по рыночной цене
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Brand Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Марка автомобиля
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => handleBrandChange(e.target.value)}
            onFocus={() => {
              if (formData.brand) {
                handleBrandChange(formData.brand);
              }
            }}
            onBlur={() => {
              setTimeout(() => setShowBrandSuggestions(false), 200);
            }}
            placeholder="Например: Toyota"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white text-gray-800"
          />
          {showBrandSuggestions && brandSuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {brandSuggestions.map((brand, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, brand }));
                    setShowBrandSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none transition-colors min-h-[44px]"
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Model Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Модель
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
            placeholder="Например: Camry"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white text-gray-800"
          />
        </div>

        {/* Year Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Год выпуска
          </label>
          <select
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white text-gray-800"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={handleShowAmount}
        disabled={!isFormValid || isCalculating}
        className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-h-[56px] flex items-center justify-center space-x-2 ${
          !isFormValid || isCalculating
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:scale-105 active:scale-95'
        }`}
        whileHover={isFormValid && !isCalculating ? { scale: 1.02 } : {}}
        whileTap={isFormValid && !isCalculating ? { scale: 0.98 } : {}}
        aria-label="Показать сумму оценки автомобиля"
      >
        <span>ПОКАЗАТЬ СУММУ</span>
        <FiArrowRight className="text-xl" />
      </motion.button>
    </motion.div>
  );
}
