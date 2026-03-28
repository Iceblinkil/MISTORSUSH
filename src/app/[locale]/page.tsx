'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getProducts } from '@/lib/supabase';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { CategoryNav, CATEGORIES } from '@/components/CategoryNav';
import { CartWidget } from '@/components/CartWidget';
import { CartModal } from '@/components/CartModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { AuthModal } from '@/components/AuthModal';
import { ShoppingBag, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations();
  const locale = React.use(params).locale;
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('classic_rolls');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { isCartOpen, setIsCartOpen } = useCart();
  const { isAuthOpen, setIsAuthOpen } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = isSearchActive || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.name_en || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.name_he || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchActive(query.length > 0);
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'classic_rolls': return { bgColor: 'bg-[#12141a]', borderColor: 'border-[#1e2330]' };
      case 'baked_rolls': return { bgColor: 'bg-[#1c1814]', borderColor: 'border-[#2e2620]' };
      case 'unusual_rolls': return { bgColor: 'bg-[#1c1a14]', borderColor: 'border-[#423821]' };
      case 'burgers': return { bgColor: 'bg-[#1e1c16]', borderColor: 'border-[#332b21]' };
      case 'gunkan': return { bgColor: 'bg-[#181a1d]', borderColor: 'border-[#252a33]' };
      case 'drinks': return { bgColor: 'bg-[#2a2d39]', borderColor: 'border-[#3a3e4c]' };
      default: return { bgColor: 'bg-card', borderColor: 'border-white/5' };
    }
  };

  const activeCategoryData = CATEGORIES.find(c => c.slug === activeCategory);
  
  return (
    <main className="min-h-screen">
      {/* Search Bar */}
      <div className="px-4 py-4 pt-6">
        <div className="relative group">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-brand transition-colors duration-300">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-card/60 border border-white/10 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-brand/40 focus:ring-4 focus:ring-brand/5 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-muted hover:text-white active:scale-90 transition-all rounded-full hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <CategoryNav 
        activeCategory={activeCategory} 
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          setIsSearchActive(false);
          setSearchQuery('');
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }} 
      />

      <div className="px-4 py-6 space-y-10">
        <section className="menu-section animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 tracking-tight text-white/95 flex items-center justify-center gap-4 text-center uppercase text-[22px]">
            <div className="h-px bg-white/10 flex-grow"></div>
            {isSearchActive ? t('searchResults') : (
              activeCategoryData ? (
                locale === 'ru' ? activeCategoryData.name : locale === 'he' ? activeCategoryData.name_he : activeCategoryData.name_en
              ) : ''
            )}
            <div className="h-px bg-white/10 flex-grow"></div>
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-muted bg-card/50 rounded-2xl border border-white/5 shadow-inner">
               <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" />
               <p className="font-medium tracking-wider text-sm uppercase">
                 {isSearchActive ? t('noResults') : t('cartEmpty')}
               </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => {
                const styles = getCategoryStyles(product.category);
                return (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    bgColor={styles.bgColor} 
                    borderColor={styles.borderColor}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>

      <CartWidget onOpenCart={() => setIsCartOpen(true)} />
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onBack={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </main>
  );
}
