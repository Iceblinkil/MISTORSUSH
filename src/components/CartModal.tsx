'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { useCart } from '@/context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartModal({ isOpen, onClose, onCheckout }: CartModalProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { cart, addToCart, removeFromCart, total, totalItems, discount } = useCart();

  const footer = (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-white/80 font-medium">{t('total')}:</span>
        <div className="flex flex-col items-end">
          {discount > 0 && <span className="text-brand text-xs line-through opacity-50">{total + discount}₪</span>}
          <span className="text-2xl font-bold text-brand">{total}₪</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button 
          onClick={onCheckout}
          disabled={totalItems === 0}
          className="w-full bg-brand text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition shadow-lg shadow-brand/20 disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none"
        >
          {t('checkoutBtn')}
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-white/5 text-white/90 font-medium py-3 rounded-xl active:scale-[0.98] transition border border-white/10"
        >
           {t('continueBtn')}
        </button>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('myCart')} footer={footer}>
      <div className="space-y-2">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center pt-8">
            <ShoppingBag className="w-14 h-14 text-muted mb-4 opacity-40" />
            <p className="text-white/60 font-medium tracking-wide">{t('cartEmpty')}</p>
            <p className="text-xs text-white/30 mt-1">{t('cartEmptySub')}</p>
          </div>
        ) : (
          cart.map((item) => {
            const name = locale === 'ru' ? item.name : locale === 'he' ? item.name_he || item.name : item.name_en || item.name;
            return (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                <div className="flex-1 pr-3">
                  <h4 className="text-[15px] font-bold text-white/95">{name}</h4>
                  <span className="text-brand font-bold mt-0.5 inline-block text-[15px]">{item.price}₪</span>
                </div>
                <div className="flex items-center bg-dark rounded-full p-0.5 border border-white/10 shrink-0">
                  <button 
                    className="w-8 h-8 flex items-center justify-center text-muted active:text-white"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-white">{item.quantity}</span>
                  <button 
                    className="w-8 h-8 flex items-center justify-center text-brand active:text-white"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
}
