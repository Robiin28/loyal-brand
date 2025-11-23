import { useState, useMemo } from 'react';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { useCart } from './hooks/useCart';
import { products } from './data/products';
import type { Product, Filters as FiltersType } from './types';

function App() {
  const [filters, setFilters] = useState<FiltersType>({
    brand: 'all',
    category: 'all',
    subcategory: 'all',
    size: 'all',
    priceRange: [0, 500],
    search: '',
    sortBy: 'featured'
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { totalItems, addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.brand !== 'all' && product.brand !== filters.brand) return false;
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.size !== 'all' && !product.sizes.includes(parseInt(filters.size))) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [filters]);

  const brands = useMemo(() => ['all', ...new Set(products.map(p => p.brand))], []);
  const categories = useMemo(() => ['all', ...new Set(products.map(p => p.category))], []);
  const sizes = useMemo(() => [...new Set(products.flatMap(p => p.sizes).sort((a, b) => a - b))], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Container with proper margins */}
      <div className="max-w-7xl mx-auto">
        
        {/* Clean Minimal Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Brand */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Loyal Brand</h1>
                  <p className="text-xs text-gray-500">Premium Shoes & Clothing</p>
                </div>
              </div>

              {/* Cart */}
              <button className="relative bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                <span>🛒</span>
                <span className="font-medium">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Filters Section */}
          <div className="px-6 py-6">
            <Filters
              filters={filters}
              onFiltersChange={setFilters}
              brands={brands}
              categories={categories}
              sizes={sizes}
            />
          </div>

          {/* Products Section */}
          <section className="px-6 pb-12">
            {/* Results Count */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700">
                {filteredProducts.length} products found
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Discover our curated collection
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => setFilters({
                    brand: 'all',
                    category: 'all',
                    subcategory: 'all',
                    size: 'all',
                    priceRange: [0, 500],
                    search: '',
                    sortBy: 'featured'
                  })}
                  className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="px-6 py-8">
            <div className="text-center text-gray-500">
              <p className="font-semibold text-gray-700 mb-2">Loyal Brand</p>
              <p>Premium Quality Shoes & Clothing</p>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <span>📞 0993929487</span>
                <span>📞 0911433491</span>
              </div>
              <p className="text-xs mt-4">© 2024 Loyal Brand. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-30 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <img 
                src={selectedProduct.images[0]} 
                alt={selectedProduct.name}
                className="w-full h-80 object-cover"
              />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                  <p className="text-gray-600 text-lg mt-1">{selectedProduct.brand}</p>
                </div>
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="text-gray-700 font-semibold ml-1">
                    {selectedProduct.rating} <span className="text-gray-500">({selectedProduct.reviewCount})</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 my-6">
                <span className="text-green-600 font-bold text-2xl">${selectedProduct.price}</span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-gray-400 line-through text-lg">${selectedProduct.originalPrice}</span>
                )}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">{selectedProduct.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 text-lg mb-3">Features:</h4>
                <ul className="text-gray-600 space-y-2">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 text-lg mb-4">Available Sizes:</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => addToCart(selectedProduct, size)}
                      className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-black hover:text-black transition-all duration-200 font-semibold"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={() => selectedProduct.sizes[0] && addToCart(selectedProduct, selectedProduct.sizes[0])}
                  className="flex-1 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
