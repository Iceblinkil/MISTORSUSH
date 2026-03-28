'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  isFriday: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isFriday, setIsFriday] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('mistorsush_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart:', e);
      }
    }

    // Check if it's Friday (Israel Time)
    const checkFriday = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jerusalem');
        if (response.ok) {
          const data = await response.json();
          setIsFriday(data.day_of_week === 5); // 5 is Friday
        } else {
          // Fallback to local time
          setIsFriday(new Date().getDay() === 5);
        }
      } catch (e) {
        setIsFriday(new Date().getDay() === 5);
      }
    };
    checkFriday();
  }, []);

  // Save cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('mistorsush_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    if (!product.is_available) return;
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Friday Special: 2+1 on Baked Rolls
  const calculateDiscount = () => {
    if (!isFriday) return 0;
    
    // Filter baked rolls (slug should match what's in DB, usually 'baked_rolls')
    const bakedRolls = cart.flatMap((item) => {
      if (item.category === 'baked_rolls') {
        return Array(item.quantity).fill(item.price);
      }
      return [];
    });

    if (bakedRolls.length < 3) return 0;

    // Sort by price ascending to give the cheapest one free
    bakedRolls.sort((a, b) => a - b);
    
    const freeCount = Math.floor(bakedRolls.length / 3);
    let discount = 0;
    for (let i = 0; i < freeCount; i++) {
      discount += bakedRolls[i];
    }
    
    return discount;
  };

  const discount = calculateDiscount();
  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        discount,
        total,
        isFriday,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
