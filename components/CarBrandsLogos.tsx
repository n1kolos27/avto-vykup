'use client';

import { motion } from 'framer-motion';

const carBrands = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Volkswagen', 'Ford',
  'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Honda', 'Lexus',
  'Volvo', 'Skoda', 'Renault', 'Peugeot', 'Opel', 'Chevrolet'
];

export default function CarBrandsLogos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="mb-6 md:mb-8"
    >
      <p className="text-sm md:text-base text-primary-100 mb-4 text-center">
        Работаем со всеми марками автомобилей
      </p>
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
        {carBrands.map((brand, index) => (
          <motion.div
            key={brand}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.03 }}
            className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-xs md:text-sm font-semibold text-white">{brand}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
