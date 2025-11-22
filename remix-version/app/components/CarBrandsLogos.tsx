import React from 'react';

const brands = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Ford', 'Nissan', 'Hyundai'];

const CarBrandsLogos: React.FC = () => {
  return (
    <div className="mb-6">
      <p className="text-sm text-white/80 text-center mb-3">Работаем со всеми марками</p>
      <div className="flex flex-row overflow-x-auto gap-3 scrollbar-hide">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="px-4 py-2 mr-3 bg-white/10 rounded-lg border border-white/20 flex-shrink-0"
          >
            <span className="text-sm text-white font-medium">{brand}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarBrandsLogos;
