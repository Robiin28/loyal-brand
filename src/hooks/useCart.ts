import { useState } from 'react';
import type { CartItem, Product } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: number) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && item.selectedSize === size
      );
      
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: number, size: number) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedSize === size)
    ));
  };

  const updateQuantity = (productId: number, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCart(prev => prev.map(item => 
      item.product.id === productId && item.selectedSize === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
};