'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Truck, Store, MapPin, MessageCircle, ArrowLeft } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { useCart } from '@/context/CartContext';
import { cn } from '@/app/[locale]/layout';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export function CheckoutModal({ isOpen, onClose, onBack }: CheckoutModalProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { cart, total, subtotal, discount, isFriday } = useCart();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    apt: '',
    floor: '',
    entrance: '',
    comment: '',
  });

  const deliveryFee = orderType === 'delivery' ? (subtotal >= 250 ? 0 : 30) : 0;
  const finalTotal = total + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitOrder = () => {
    if (!formData.name || !formData.phone || (orderType === 'delivery' && !formData.address)) {
      alert('Please fill in all required fields');
      return;
    }

    const restaurantPhone = '972559284670';
    
    let message = `${t('whatsappOrderTitle')}\n`;
    cart.forEach((item) => {
      const name = locale === 'ru' ? item.name : locale === 'he' ? item.name_he || item.name : item.name_en || item.name;
      message += `- ${name} (${item.quantity} x ${item.price}₪)\n`;
    });

    if (formData.comment) {
      message += `\n${t('whatsappComment')} ${formData.comment}\n`;
    }

    if (orderType === 'delivery') {
      message += `\n${t('whatsappDelivery')} ${formData.address}`;
      if (formData.apt) message += `, ${t('whatsappApt')} ${formData.apt}`;
      if (formData.floor) message += `, ${t('whatsappFloor')} ${formData.floor}`;
      if (formData.entrance) message += `, ${t('whatsappEnt')} ${formData.entrance}`;
      message += `\n📍 ${t('whatsappAddress')} ${formData.address}\n`;
    } else {
      message += `\n${t('whatsappPickup')}\n`;
    }

    if (isFriday && discount > 0) {
      message += `\n${t('whatsappPromo')} -${discount}₪\n`;
    }

    message += `\n${t('whatsappTotal')} ${finalTotal}₪`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${restaurantPhone}?text=${encodedMessage}`, '_blank');
  };

  const footer = (
    <div className="space-y-4">
      <div className="bg-card/40 rounded-2xl p-5 border border-white/5 space-y-3">
        <div className="flex justify-between text-xs text-muted uppercase font-black tracking-widest">
          <span>{t('subtotal')}</span>
          <span className="text-white">{subtotal}₪</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs text-brand font-black uppercase tracking-widest">
            <span>{t('discount2plus1')}</span>
            <span>-{discount}₪</span>
          </div>
        )}
        <div className="flex justify-between text-xs text-muted uppercase font-black tracking-widest">
          <span>{t('deliveryCostLabel')}</span>
          <span className="text-white">{deliveryFee === 0 ? t('free') : `${deliveryFee}₪`}</span>
        </div>
        <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/5 mt-1 uppercase tracking-wider">
          <span>{t('totalToPay')}</span>
          <span className="text-brand">{finalTotal}₪</span>
        </div>
      </div>

      <button 
        onClick={submitOrder}
        className="w-full bg-[#25D366] text-white font-black py-4 rounded-2xl active:scale-[0.98] transition shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em]"
      >
        <span>{t('sendWhatsapp')}</span>
        <MessageCircle className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('checkoutTitle')} footer={footer}>
      {/* Order Type Toggle */}
      <div className="flex bg-card p-1 rounded-xl mb-6 relative h-12">
        <div 
          className={cn(
            "absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-brand rounded-lg shadow-sm transition-transform duration-300 top-1",
            locale === 'he' ? (orderType === 'delivery' ? 'right-1' : 'right-[50%]') : (orderType === 'delivery' ? 'left-1' : 'left-[50%]')
          )}
        />
        <button 
          onClick={() => setOrderType('delivery')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 text-sm font-bold z-10 transition-colors",
            orderType === 'delivery' ? "text-white" : "text-white/60"
          )}
        >
          <Truck className="w-4 h-4" />
          {t('delivery')}
        </button>
        <button 
          onClick={() => setOrderType('pickup')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 text-sm font-bold z-10 transition-colors",
            orderType === 'pickup' ? "text-white" : "text-white/60"
          )}
        >
          <Store className="w-4 h-4" />
          {t('pickup')}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide">
            {t('nameField')} <span className="text-brand">*</span>
          </label>
          <input 
            type="text" 
            id="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t('namePlaceholder')}
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-brand transition text-sm"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide">
            {t('phoneField')} <span className="text-brand">*</span>
          </label>
          <input 
            type="tel" 
            id="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="05x-xxxxxxx"
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-brand transition text-sm"
          />
        </div>

        {orderType === 'delivery' && (
          <div className="space-y-4 animate-fade-in">
            <div className="pt-2">
              <h3 className="text-sm font-bold text-white/90 mb-2 border-b border-white/10 pb-2 flex items-center justify-between">
                <span>{t('addressTitle')}</span>
                <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-medium">
                  {t('addressBadge')}
                </span>
              </h3>
              <p className="text-[11px] text-muted mb-3 leading-relaxed">
                {t('courierFee')} <strong className="text-white">30₪</strong><br />
                {t('freeDeliveryNotice')}
              </p>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide">
                {t('addressField')} <span className="text-brand">*</span>
              </label>
              <input 
                type="text" 
                id="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder={t('addressPlaceholder')}
                className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-brand transition text-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide">{t('aptField')}</label>
                <input 
                  type="text" 
                  id="apt"
                  value={formData.apt}
                  onChange={handleInputChange}
                  placeholder="№"
                  className="w-full bg-card border border-white/10 rounded-xl px-3 py-3 text-white placeholder-white/30 outline-none focus:border-brand transition text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide">{t('floorField')}</label>
                <input 
                  type="text" 
                  id="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  placeholder="№"
                  className="w-full bg-card border border-white/10 rounded-xl px-3 py-3 text-white placeholder-white/30 outline-none focus:border-brand transition text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide">{t('entranceField')}</label>
                <input 
                  type="text" 
                  id="entrance"
                  value={formData.entrance}
                  onChange={handleInputChange}
                  placeholder="№"
                  className="w-full bg-card border border-white/10 rounded-xl px-3 py-3 text-white placeholder-white/30 outline-none focus:border-brand transition text-sm"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide">
            {t('commentField')}
          </label>
          <textarea 
            id="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder={t('commentPlaceholder')}
            rows={2}
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-brand transition resize-none text-sm"
          />
        </div>
      </div>
    </Modal>
  );
}
