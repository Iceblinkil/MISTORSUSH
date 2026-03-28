'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { 
  Menu, 
  Camera, 
  MessageCircle, 
  User, 
  ShoppingBag 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsAuthOpen } = useAuth();

  const nextLocale = locale === 'ru' ? 'en' : locale === 'en' ? 'he' : 'ru';
  const langLabel = locale.toUpperCase();

  return (
    <header className="bg-dark border-b border-white/10 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 py-3 relative">
        {/* Top Left Logo as Hamburger */}
        <div className="relative z-10 flex items-center shrink-0">
          <button className="relative group active:scale-95 transition-transform duration-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full shadow-lg border border-white/20 bg-white/5 overflow-hidden group-hover:border-brand/40 transition-colors">
              <Image 
                src="/mistorsush_logo.png" 
                alt="Mistorsush Logo" 
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-brand text-white p-1 rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
              <Menu className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Top Right Icons */}
        <div className="flex items-center gap-2 relative z-10 shrink-0">
          {/* Lang Switcher */}
          <Link 
            href={pathname} 
            locale={nextLocale}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black tracking-wider text-white active:scale-95 transition shadow-lg border border-white/5"
          >
            {langLabel}
          </Link>
          
          {/* Instagram */}
          <a 
            href="https://instagram.com/mvladislavmistorsushi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white active:scale-95 transition shadow-lg shadow-pink-500/20"
          >
            <Camera className="w-4.5 h-4.5" />
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/972559284670" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white active:scale-95 transition shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Account Button */}
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition shadow-lg border border-white/5 relative group"
          >
            {user ? (
               <div className="w-full h-full rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-black text-brand border border-brand/30">
                 {user.email?.charAt(0).toUpperCase()}
               </div>
            ) : (
              <User className="w-5 h-5" />
            )}
            {user && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark"></div>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white active:bg-white/20 active:scale-95 transition relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <div className="absolute -top-1 -right-1 bg-brand text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm shadow-black/50">
                {totalItems}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Center Title */}
      <div className="flex flex-col items-center justify-center pb-2 pt-1 w-full">
        <h1 className="text-[20px] font-bold tracking-[0.3em] text-white/95 uppercase drop-shadow-md">
          MISTOR<span className="text-brand font-black">SUSH</span>
        </h1>
        <div className="w-10 h-[3px] bg-brand mt-2 rounded-full shadow-[0_0_8px_rgba(230,57,70,0.6)]"></div>
      </div>

      <div className="px-4 pb-3 flex flex-col items-center justify-center space-y-1 mt-2">
        <p className="text-[11px] font-bold tracking-widest text-muted uppercase text-center">
          {t('subtitle')}
        </p>
        <h2 className="text-xs font-semibold text-white/95 text-center uppercase tracking-wide">
          {t('workingHours')}
        </h2>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-brand mt-1.5">
          <span className="text-[10px] font-black tracking-widest uppercase">
            {t('openEveryday')}
          </span>
        </div>
      </div>

      {/* Friday Discount Banner */}
      <div className="w-full bg-gradient-to-r from-[#171a21] via-card to-[#171a21] border-y border-white/5 py-3.5 px-6 relative overflow-hidden flex items-center justify-center shadow-xl shadow-black/30 group mt-1">
        <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-brand/20 blur-[30px] rounded-full"></div>
        <div className="absolute -right-5 -top-5 w-20 h-20 bg-white/10 blur-[25px] rounded-full"></div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand/10 border border-brand/30 text-brand shadow-[0_0_15px_rgba(230,57,70,0.2)] shrink-0">
             🔥
          </div>
          <div className="flex flex-col text-left justify-center">
            <span className="text-brand font-black text-sm uppercase tracking-wider">
              {t('promoTitle')}
            </span>
            <span className="text-white/90 text-xs font-medium leading-snug mt-1">
              {t('promoDesc')} 
              <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded leading-none shadow-sm ml-1">2+1</strong>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
