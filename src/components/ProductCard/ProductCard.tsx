import { useState } from 'react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const hasMultipleImages = product.images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const selectImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
      onClick={() => onSelect(product)}
    >
      {/* Image Container */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Main Image */}
        <img 
          src={product.images[currentImageIndex]} 
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
            -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm z-10">
          ⭐ {product.rating}
        </div>

        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-60 z-10"
            >
              ‹
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-60 z-10"
            >
              ›
            </button>
          </>
        )}

        {/* Mini Thumbnails Overlay - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3 flex gap-1 z-10">
            {product.images.slice(0, 3).map((image, index) => (
              <button
                key={index}
                onClick={(e) => selectImage(index, e)}
                className={`relative w-8 h-8 rounded-lg border-2 bg-white overflow-hidden transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'border-blue-500 scale-110 shadow-md' 
                    : 'border-white opacity-80 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* White border effect inside the thumbnail */}
                <div className={`absolute inset-0 rounded-lg border ${
                  index === currentImageIndex ? 'border-blue-400' : 'border-white'
                }`} />
                
                {/* Active indicator dot */}
                {index === currentImageIndex && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>
            ))}
            
            {/* Show +X if more than 3 images */}
            {product.images.length > 3 && (
              <div className="w-8 h-8 bg-black bg-opacity-60 text-white text-xs rounded-lg flex items-center justify-center font-semibold backdrop-blur-sm">
                +{product.images.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Image Counter - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm z-10">
            {currentImageIndex + 1} / {product.images.length}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2 flex-1 pr-2">
            {product.name}
          </h3>
        </div>
        
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          {product.brand}
        </p>
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-green-600 text-lg">${product.price}</span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            Sizes: {product.sizes.slice(0, 3).join(', ')}
            {product.sizes.length > 3 && '...'}
          </div>
        </div>
      </div>
    </div>
  );
};