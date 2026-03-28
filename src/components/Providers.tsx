'use client';

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

export function Providers({ 
  children, 
  messages, 
  locale 
}: { 
  children: React.ReactNode; 
  messages: AbstractIntlMessages;
  locale: string;
}) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
