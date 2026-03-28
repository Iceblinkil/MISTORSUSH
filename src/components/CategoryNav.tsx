'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/app/[locale]/layout';

export interface Category {
  slug: string;
  name: string;
  name_en: string;
  name_he: string;
}

export const CATEGORIES: Category[] = [
  { slug: 'classic_rolls', name: 'Классические роллы', name_en: 'Classic Rolls', name_he: 'רולים קלאסיים' },
  { slug: 'baked_rolls', name: 'Запеченные роллы', name_en: 'Baked Rolls', name_he: 'רולים אפויים' },
  { slug: 'unusual_rolls', name: 'Необычные роллы', name_en: 'Unusual Rolls', name_he: 'רולים מיוחדים' },
  { slug: 'burgers', name: 'Рисовые гамбургеры', name_en: 'Rice Burgers', name_he: 'המבורגר אורז' },
  { slug: 'gunkan', name: 'Гункан и суши', name_en: 'Gunkan and Sushi', name_he: 'גונקן וסושי' },
  { slug: 'drinks', name: 'Напитки', name_en: 'Drinks', name_he: 'משקאות' },
];

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export function CategoryNav({ activeCategory, onSelectCategory }: CategoryNavProps) {
  const locale = useLocale();

  return (
    <nav className="overflow-x-auto no-scrollbar flex gap-2 px-4 py-3 border-t border-white/5 sticky top-[var(--header-height)] bg-dark/80 backdrop-blur-md z-40">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const name = locale === 'ru' ? cat.name : locale === 'he' ? cat.name_he : cat.name_en;

        return (
          <button 
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={cn(
              "category-link whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200",
              isActive 
                ? "text-brand border-brand/30 bg-brand/10" 
                : "text-muted border-white/5 bg-card hover:bg-white/5"
            )}
          >
            {name}
          </button>
        );
      })}
    </nav>
  );
}
