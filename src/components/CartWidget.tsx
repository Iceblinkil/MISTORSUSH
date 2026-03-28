'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/app/[locale]/layout';

export function CartWidget({ onOpenCart }: { onOpenCart: () => void }) {
  const t = useTranslations();
  const { totalItems, total } = useCart();

  const isVisible = totalItems > 0;

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 w-full p-4 transform transition-transform duration-300 z-40 float-bottom-safe",
        isVisible ? "translate-y-0" : "translate-y-[150%]"
      )}
    >
      <div 
        className="glass-cart rounded-2xl flex justify-between items-center p-4 cursor-pointer active:scale-95 transition-transform"
        onClick={onOpenCart}
      >
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white/90">
            {t('inCart')} {totalItems} {t('pcs')}
          </span>
          <span className="text-xl font-bold">{total}₪</span>
        </div>
        <div className="flex items-center gap-2 bg-white text-brand px-5 py-2.5 rounded-xl font-semibold shadow-lg">
          <span>{t('orderBtn')}</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
