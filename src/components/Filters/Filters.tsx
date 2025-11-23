import type { Filters as FiltersType } from '../../types';

interface FiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  brands: string[];
  categories: string[];
  sizes: number[];
}

export const Filters = ({ filters, onFiltersChange, brands, categories, sizes }: FiltersProps) => {
  return (
    <div className="bg-white p-6 border-b border-gray-200 space-y-4 shadow-sm">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => onFiltersChange({...filters, search: e.target.value})}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
        />
      </div>
      
      {/* Filter Grid */}
      <div className="grid grid-cols-2 gap-3">
        <select 
          value={filters.brand}
          onChange={(e) => onFiltersChange({...filters, brand: e.target.value})}
          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200"
        >
          <option value="all">🏷️ All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        
        <select 
          value={filters.category}
          onChange={(e) => onFiltersChange({...filters, category: e.target.value})}
          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200"
        >
          <option value="all">📦 All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select 
          value={filters.size}
          onChange={(e) => onFiltersChange({...filters, size: e.target.value})}
          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200"
        >
          <option value="all">📏 All Sizes</option>
          {sizes.map(size => (
            <option key={size} value={size.toString()}>Size {size}</option>
          ))}
        </select>

        <select 
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({...filters, sortBy: e.target.value})}
          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200"
        >
          <option value="featured">🎯 Featured</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💰 Price: High to Low</option>
          <option value="rating">⭐ Top Rated</option>
          <option value="newest">🆕 Newest</option>
        </select>
      </div>
    </div>
  );
};