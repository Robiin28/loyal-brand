import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 150,
    originalPrice: 180,
    sizes: [38, 39, 40, 41, 42, 43],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop'
    ],
    category: 'shoes',
    subcategory: 'sneakers',
    description: 'Comfortable running shoes with Air Max technology for all-day comfort and style.',
    inStock: true,
    features: ['Air Cushioning', 'Breathable Mesh', 'Rubber Sole'],
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 21',
    brand: 'Adidas',
    price: 180,
    sizes: [39, 40, 41, 42, 43, 44],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
    ],
    category: 'shoes',
    subcategory: 'running',
    description: 'Premium running shoes with Boost technology for maximum energy return.',
    inStock: true,
    features: ['Boost Foam', 'Primeknit Upper', 'Continental Rubber'],
    rating: 4.7,
    reviewCount: 95
  },
  {
    id: 3,
    name: 'Classic Cotton T-Shirt',
    brand: 'Uniqlo',
    price: 25,
    sizes: [36, 38, 40, 42, 44],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop'
    ],
    category: 'clothing',
    subcategory: 'tops',
    description: 'Soft cotton t-shirt for everyday wear with premium comfort.',
    inStock: true,
    features: ['100% Cotton', 'Pre-shrunk', 'Machine Wash'],
    rating: 4.3,
    reviewCount: 67
  },
  {
    id: 4,
    name: 'Levi\'s 511 Slim Jeans',
    brand: 'Levi\'s',
    price: 80,
    originalPrice: 100,
    sizes: [30, 32, 34, 36, 38],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&h=500&fit=crop'
    ],
    category: 'clothing',
    subcategory: 'bottoms',
    description: 'Classic slim fit jeans from Levi\'s with premium denim quality.',
    inStock: true,
    features: ['99% Cotton, 1% Elastane', 'Slim Fit', 'Stone Wash'],
    rating: 4.6,
    reviewCount: 203
  },
  {
    id: 5,
    name: 'Jordan 1 Retro High',
    brand: 'Jordan',
    price: 170,
    sizes: [40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
    ],
    category: 'shoes',
    subcategory: 'basketball',
    description: 'Iconic basketball shoes with retro design and modern comfort.',
    inStock: true,
    features: ['Leather Upper', 'Air Sole', 'High Top'],
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: 6,
    name: 'Zara Blazer',
    brand: 'Zara',
    price: 120,
    originalPrice: 150,
    sizes: [36, 38, 40, 42, 44],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=500&fit=crop'
    ],
    category: 'clothing',
    subcategory: 'outerwear',
    description: 'Elegant blazer for formal occasions with perfect fit.',
    inStock: true,
    features: ['Wool Blend', 'Notch Lapel', 'Two Button'],
    rating: 4.4,
    reviewCount: 89
  }
];