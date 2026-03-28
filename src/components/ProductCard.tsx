'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { cn } from '@/app/[locale]/layout';

interface ProductCardProps {
  product: Product;
  bgColor: string;
  borderColor: string;
}

export function ProductCard({ product, bgColor, borderColor }: ProductCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const name = locale === 'ru' ? product.name : locale === 'he' ? product.name_he || product.name : product.name_en || product.name;
  const description = locale === 'ru' ? product.description : locale === 'he' ? product.description_he || product.description : product.description_en || product.description;

  const isAvailable = product.is_available;

  return (
    <div className={cn(
      "product-card flex gap-4 p-4 rounded-[1.5rem] border shadow-lg shadow-black/30 transition-all duration-300 relative group hover:border-brand/40",
      bgColor,
      borderColor,
      !isAvailable && "opacity-60 grayscale-[0.7] contrast-[0.8]"
    )}>
      {!isAvailable && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex justify-center">
          <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-2xl">
            {t('outOfStock')}
          </span>
        </div>
      )}

      {product.image_url && (
        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden shadow-lg relative transition-all group-hover:scale-105 duration-300 cursor-pointer">
          <Image 
            src={product.image_url} 
            alt={name} 
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
             <Plus className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col justify-between py-0.5">
        <div className="mb-2">
          <h3 className="font-bold text-[14px] sm:text-[16px] leading-snug text-white/95 mb-1 line-clamp-2">
            {name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-muted leading-relaxed line-clamp-2 opacity-70">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center transition-all">
          <span className={cn(
            "font-black text-sm sm:text-lg text-brand",
            !isAvailable && "opacity-50"
          )}>
            {product.price}₪
          </span>
          
          <div className="cart-controls">
            {quantity > 0 ? (
              <div className="flex items-center bg-dark rounded-full p-0.5 border border-white/10 shadow-inner">
                <button 
                  className="w-7 h-7 flex items-center justify-center text-muted active:text-white"
                  onClick={() => removeFromCart(product.id)}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-white">{quantity}</span>
                <button 
                  className="w-7 h-7 flex items-center justify-center text-brand active:text-white"
                  onClick={() => addToCart(product)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                className={cn(
                  "bg-brand text-white w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition shadow-lg shadow-brand/30",
                  !isAvailable && "pointer-events-none opacity-50"
                )}
                onClick={() => addToCart(product)}
                disabled={!isAvailable}
              >
                <Plus className="w-4 h-4" strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
