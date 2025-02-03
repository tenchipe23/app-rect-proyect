import React from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';

interface ProductFilterProps {
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  sortBy: 'name' | 'price-asc' | 'price-desc';
  setSortBy: (value: 'name' | 'price-asc' | 'price-desc') => void;
  categories?: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  categories = []
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
      {/* Category Filter */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <FaFilter className="text-gray-500" />
        {categories.length > 0 ? (
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder="Filtrar productos..."
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        )}
      </div>

      {/* Sorting */}
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <FaSort className="text-gray-500" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'price-asc' | 'price-desc')}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="name">Nombre</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;