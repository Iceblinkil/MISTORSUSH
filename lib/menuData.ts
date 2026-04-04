export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  nameHe?: string;
  price: number;
  ingredients: string;
  ingredientsEn: string;
  ingredientsHe?: string;
  image?: string;
  is_available?: boolean;
}

export interface MenuCategory {
  category: string;
  categoryEn: string;
  categoryHe?: string;
  slug: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    category: 'Классические роллы',
    categoryEn: 'Classic Rolls',
    categoryHe: 'רולים קלאסיים',
    slug: 'classic_rolls',
    items: [
      { id: 'c1', name: 'Маки Лосось', nameEn: 'Salmon Maki', nameHe: 'מאקי סלמון', price: 30, ingredients: '', ingredientsEn: '', ingredientsHe: '', image: '/img/products/classic_rolls/salomon_maki.webp' },
      { id: 'c2', name: 'Маки Авокадо', nameEn: 'Avocado Maki', nameHe: 'מאקי אבוקדו', price: 28, ingredients: '', ingredientsEn: '', ingredientsHe: '' },
      { id: 'c3', name: 'Маки Кампье', nameEn: 'Kampye Maki', nameHe: 'מאקי קמפיי', price: 25, ingredients: '', ingredientsEn: '', ingredientsHe: '' },
      { id: 'c4', name: 'Маки Огурец', nameEn: 'Cucumber Maki', nameHe: 'מאקי מלפפון', price: 25, ingredients: '', ingredientsEn: '', ingredientsHe: '', image: 'Cucumber_Maki.webp' },
      { id: 'c5', name: 'Маки Морковка', nameEn: 'Carrot Maki', nameHe: 'מאקי גזר', price: 25, ingredients: '', ingredientsEn: '', ingredientsHe: '' },
      { id: 'c6', name: 'Маки Ассорти', nameEn: 'Assorted Maki', nameHe: 'מאקי מגוון', price: 35, ingredients: '', ingredientsEn: '', ingredientsHe: '', image: '/img/products/classic_rolls/Assorted_Maki.webp' },
      { id: 'c7', name: 'Филадельфия', nameEn: 'Philadelphia', nameHe: 'פילדלפיה', price: 45, ingredients: 'Рис, огурец, кремчиз, лосось сверху', ingredientsEn: 'Rice, cucumber, cream cheese, salmon on top', ingredientsHe: 'אורז, מלפפון, גבינת שמנת, סלמון מעל', image: '/img/products/classic_rolls/Philadelphia.webp' },
      { id: 'c8', name: 'Филадельфия Крабовые палочки', nameEn: 'Crab Stick Philadelphia', nameHe: 'פילדלפיה מקלות סרטנים', price: 50, ingredients: 'Рис, огурец, кремчиз, крабовые палочки, лосось сверху', ingredientsEn: 'Rice, cucumber, cream cheese, crab sticks, salmon on top', ingredientsHe: 'אורז, מלפפון, גבינת שמנת, מקלות סרטנים, סלמון מעל', image: '/img/products/classic_rolls/Crab_Stick_Philadelphia.webp' },
      { id: 'c9', name: 'Филадельфия Лосось', nameEn: 'Salmon Philadelphia', nameHe: 'פילדלפיה סלמון', price: 50, ingredients: 'Рис, лосось, огурец, кремчиз, лосось сверху', ingredientsEn: 'Rice, salmon, cucumber, cream cheese, salmon on top', ingredientsHe: 'אורז, סלמון, מלפפון, גבינת שמנת, סלמון מעל' },
      { id: 'c10', name: 'Филадельфия Авокадо', nameEn: 'Avocado Philadelphia', nameHe: 'פילדלפיה אבוקדו', price: 55, ingredients: 'Рис, авокадо, огурец, кремчиз, лосось сверху', ingredientsEn: 'Rice, avocado, cucumber, cream cheese, salmon on top', ingredientsHe: 'אורז, אבוקדו, מלפפון, גבינת שמנת, סלמון מעל' },
      { id: 'c11', name: 'Филадельфия Осмаленная', nameEn: 'Seared Philadelphia', nameHe: 'פילדלפיה שרופה', price: 50, ingredients: 'Рис, огурец, кремчиз, лосось сверху', ingredientsEn: 'Rice, cucumber, cream cheese, salmon on top', ingredientsHe: 'אורז, מלפפון, גבינת שמנת, סלמון שרוף מעל' },
      { id: 'c12', name: 'Филадельфия Тамаго', nameEn: 'Philadelphia Tamago', nameHe: 'פילדלפיה טמאגו', price: 45, ingredients: 'Рис, омлет тамаго, огурец, кремчиз, лосось сверху', ingredientsEn: 'Rice, tamago omelet, cucumber, cream cheese, salmon on top', ingredientsHe: 'אורז, חביתת טמאגו, מלפפון, גבינת שמנת, סלמון מעל' },
      { id: 'c13', name: 'Зеленый дракон', nameEn: 'Green Dragon', nameHe: 'דרקון ירוק', price: 60, ingredients: 'Рис, огурец, кремчиז, лосось сверху, авокадо, терияки, кунжут', ingredientsEn: 'Rice, cucumber, cream cheese, salmon on top, covered with avocado, teriyaki sauce, sesame', ingredientsHe: 'אורז, מלפפון, גבינת שמנת, סלמון מעל, מכוסה אבוקדו, טריאקי, שומשום', image: '/img/products/classic_rolls/Green_Dragon.webp' },
      { id: 'c14', name: 'Красный дракон', nameEn: 'Red Dragon', nameHe: 'דרקון אדום', price: 65, ingredients: 'Рис, укроп, кремчиз, лосось сверху, шапка из икры', ingredientsEn: 'Rice, dill, cream cheese, salmon on top, caviar topping', ingredientsHe: 'אורז, שמיר, גבינת שמנת, סלמון מעל, כיפת קוויאר', image: '/img/products/classic_rolls/Red_Dragon.webp' },
      { id: 'c15', name: 'Креветка Панко (не жаренный)', nameEn: 'Panko Shrimp (non-fried)', nameHe: 'שרימפס פנקו (לא מטוגן)', price: 45, ingredients: 'Рис, кремчиз, креветка, хасса, панировочные сухари', ingredientsEn: 'Rice, cream cheese, shrimp, lettuce, breadcrumbs', ingredientsHe: 'אורז, גבינת שמנת, שרימפס, חסה, פירורי לחם' },
      { id: 'c16', name: 'Лосось Панко (не жаренный)', nameEn: 'Panko Salmon (non-fried)', nameHe: 'סלמון פנקו (לא מטוגן)', price: 50, ingredients: 'Рис, кремчиз, лосось, хасса, панировочные сухари', ingredientsEn: 'Rice, cream cheese, salmon, lettuce, breadcrumbs', ingredientsHe: 'אורז, גבינת שמנת, סלמון, חסה, פירורי לחם' },
      { id: 'c17', name: 'Сырная креветка', nameEn: 'Cheese Shrimp', nameHe: 'שרימפס גבינה', price: 50, ingredients: 'Рис, кремчиз, креветка, огурец, сыр чеддер сверху', ingredientsEn: 'Rice, cream cheese, shrimp, cucumber, cheddar cheese on top', ingredientsHe: 'אורז, גבינת שמנת, שרימפס, מלפפון, גבינת צ\'דר מעל', image: '/img/products/classic_rolls/Cheese_Shrimp.webp' },
      { id: 'c18', name: 'Закрытый грибник', nameEn: 'Hidden Mushroom', nameHe: 'פטריות סגורות', price: 55, ingredients: 'Рис, кремчиз, огурец, грибы шампиньоны (жаренные)', ingredientsEn: 'Rice, cream cheese, cucumber, fried mushrooms', ingredientsHe: 'אורז, גבינת שמנת, מלפפון, פטריות מוקפצות', image: '/img/products/classic_rolls/Hidden_Mushroom.webp' },
      { id: 'c19', name: 'Веганский рай', nameEn: 'Vegan Paradise', nameHe: 'גן עדן טבעוני', price: 45, ingredients: 'Рис, морковка, батат (запеченный), огурец, хасса, кампье', ingredientsEn: 'Rice, carrot, sweet potato (baked), cucumber, lettuce, kanpyo', ingredientsHe: 'אורז, גזר, בטטה אפויה, מלפפון, חסה, קמפיי' },
      { id: 'c20', name: 'Морской бриз', nameEn: 'Sea Breeze', nameHe: 'רוח ים', price: 55, ingredients: 'Рис, креветка, кремчиз, сверху морская капуста, кунжут', ingredientsEn: 'Rice, shrimp, cream cheese, seaweed on top, sesame', ingredientsHe: 'אורז, שרימפס, גבינת שמנת, אצות מעל, שומשום' },
      { id: 'c21', name: 'Калифорния', nameEn: 'California', nameHe: 'קליפורניה', price: 60, ingredients: 'Рис, лосось, кремчиз, огурец, сверху оранжевая тобика', ingredientsEn: 'Rice, salmon, cream cheese, cucumber, orange tobiko on top', ingredientsHe: 'אורז, סלמון, גבינת שמנת, מלפפון, טוביקו כתום מעל' },
    ],
  },
  {
    category: 'Запеченные роллы',
    categoryEn: 'Baked Rolls',
    categoryHe: 'רולים אפויים',
    slug: 'baked_rolls',
    items: [
      { id: 'z1', name: 'Грибной Амур', nameEn: 'Mushroom Amur', nameHe: 'אמור פטריות', price: 60, ingredients: 'Рис, грибы шампиньоны, кремчиз, красный болгарский перец, помидор, сырная шапка', ingredientsEn: 'Rice, mushrooms, cream cheese, red bell pepper, tomato, cheese topping', ingredientsHe: 'אורז, פטריות, גבינת שמנת, פלפל אדום, עגבנייה, כיפת גבינה', image: '/img/products/baked_rolls/Mushroom_Amur.webp' },
      { id: 'z2', name: 'Белый самурай', nameEn: 'White Samurai', nameHe: 'סמוראי לבן', price: 60, ingredients: 'Рис, лосось, омлет тамаго, креветка, сырная шапка, сверху кунжут и терияки', ingredientsEn: 'Rice, salmon, tamago omelet, shrimp, cheese topping, sesame and teriyaki on top', ingredientsHe: 'אורז, סלמון, חביתת טמאגו, שרימפס, כיפת גבינה, שומשום וטריאקי מעל', image: '/img/products/baked_rolls/White_Samurai.webp' },
      { id: 'z3', name: 'Бурный авокадо', nameEn: 'Stormy Avocado', nameHe: 'אבוקדו סוער', price: 60, ingredients: 'Рис, лосось, авокадо, морковка, огурец, сырная шапка', ingredientsEn: 'Rice, salmon, avocado, carrot, cucumber, cheese topping', ingredientsHe: 'אורז, סלמון, אבוקדו, גזר, מלפפון, כיפת גבינה' },
      { id: 'z4', name: 'Веган бум', nameEn: 'Vegan Boom', nameHe: 'בום טבעוני', price: 55, ingredients: 'Рис, авокадо, морковка, огурец, кампье, хасса, сырная шапка, терияки и кунжут', ingredientsEn: 'Rice, avocado, carrot, cucumber, kanpyo, lettuce, cheese topping, teriyaki and sesame', ingredientsHe: 'אורז, אבוקדו, גזר, מלפפון, קמפיי, חסה, כיפת גבינה, טריאקי ושומשום' },
    ],
  },
  {
    category: 'Необычные роллы',
    categoryEn: 'Unusual Rolls',
    categoryHe: 'רולים יוצאי דופן',
    slug: 'unusual_rolls',
    items: [
      { id: 'u1', name: 'Закрытый лосось', nameEn: 'Hidden Salmon', nameHe: 'סלמון נסתר', price: 60, ingredients: 'Лосось, кремчиз, огурец, лосось', ingredientsEn: 'Salmon, cream cheese, cucumber, salmon', ingredientsHe: 'סלמון, גבינת שמנת, מלפפון, סלמון' },
      { id: 'u2', name: 'Ошаленный ролл', nameEn: 'Crazy Roll', nameHe: 'רול משוגע', price: 55, ingredients: 'Лосось, кремчиز, огурец, огурец', ingredientsEn: 'Salmon, cream cheese, cucumber, cucumber', ingredientsHe: 'סלמון, גבינת שמנת, מלפפון, מלפפון' },
      { id: 'u3', name: 'Наглая креветка', nameEn: 'Cheeky Shrimp', nameHe: 'שרימפס חצוף', price: 55, ingredients: 'Креветка, кремчиз, огурец, огурец', ingredientsEn: 'Shrimp, cream cheese, cucumber, cucumber', ingredientsHe: 'שרימפס, גבינת שמנת, מלפפון, מלפפון' },
      { id: 'u4', name: 'Веган', nameEn: 'Vegan', nameHe: 'טבעוני', price: 45, ingredients: 'Огурец, морковка, помидор, хасса, омлет тамаго', ingredientsEn: 'Cucumber, carrot, tomato, lettuce, tamago omelet', ingredientsHe: 'מלפפון, גזר, עגבנייה, חסה, חביתת טמאגו' },
    ],
  },
  {
    category: 'Рисовые гамбургеры',
    categoryEn: 'Rice Burgers',
    categoryHe: 'המבורגרי אורז',
    slug: 'burgers',
    items: [
      { id: 'b1', name: 'Рисовый гамбургер', nameEn: 'Rice Burger', nameHe: 'המבורגר אורז', price: 55, ingredients: 'Начинки на выбор. Жаренные появятся позже', ingredientsEn: 'Choice of fillings. Fried options coming soon', ingredientsHe: 'מילויים לבחירה. אפשרויות מטוגנות יגיעו בקרוב', image: '/img/products/burgers/Rice_Burger.webp' },
    ],
  },
  {
    category: 'Гункан и суши',
    categoryEn: 'Gunkan and Sushi',
    categoryHe: 'גונקן וסושי',
    slug: 'gunkan',
    items: [
      { id: 'g1', name: 'Гункан и суши', nameEn: 'Gunkan and Sushi', nameHe: 'גונקן וסושי', price: 50, ingredients: 'Начинки на выбор. Жаренные появятся позже', ingredientsEn: 'Choice of fillings. Fried options coming soon', ingredientsHe: 'מילויים לבחירה. אפשרויות מטוגנות יגיעו בקרוב' },
    ],
  },
  {
    category: 'Напитки',
    categoryEn: 'Drinks',
    categoryHe: 'משקאות',
    slug: 'drinks',
    items: [
      { id: 'd1', name: 'Кока-Кола', nameEn: 'Coca-Cola', nameHe: 'קוקה קולה', price: 12, ingredients: '0.33 л', ingredientsEn: '0.33 L', ingredientsHe: '0.33 ל׳', image: '/img/products/drinks/coca_cola_p.webp' },
      { id: 'd2', name: 'Кока-Кола Зеро', nameEn: 'Coca-Cola Zero', nameHe: 'קוקה קולה זירו', price: 12, ingredients: '0.33 л', ingredientsEn: '0.33 L', ingredientsHe: '0.33 ל׳', image: '/img/products/drinks/coca_cola_zero_p.webp' },
      { id: 'd3', name: 'Спрайт', nameEn: 'Sprite', nameHe: 'ספרייט', price: 12, ingredients: '0.33 л', ingredientsEn: '0.33 L', ingredientsHe: '0.33 ל׳', image: '/img/products/drinks/sprite.webp' },
      { id: 'd4', name: 'Спрайт Зеро', nameEn: 'Sprite Zero', nameHe: 'ספרייט זירו', price: 12, ingredients: '0.33 л', ingredientsEn: '0.33 L', ingredientsHe: '0.33 ל׳', image: '/img/products/drinks/sprite_zero.webp' },
    ],
  },
];

export const categoryBg: Record<string, { bg: string; border: string }> = {
  classic_rolls: { bg: 'bg-[#12141a]', border: 'border-[#1e2330]' },
  baked_rolls:   { bg: 'bg-[#1c1814]', border: 'border-[#2e2620]' },
  unusual_rolls: { bg: 'bg-[#1c1a14]', border: 'border-[#423821]' },
  burgers:       { bg: 'bg-[#1e1c16]', border: 'border-[#332b21]' },
  gunkan:        { bg: 'bg-[#181a1d]', border: 'border-[#252a33]' },
  drinks:        { bg: 'bg-[#2a2d39]', border: 'border-[#3a3e4c]' },
};

export const categoryIcons: Record<string, string> = {
  'Классические роллы': '🍣',
  'Запеченные роллы': '🔥',
  'Необычные роллы': '✨',
  'Рисовые гамбургеры': '🍔',
  'Гункан и суши': '🥢',
  'Напитки': '🥤',
};

/** Helper: get display name for an item based on lang */
export function getItemName(item: MenuItem, lang: string): string {
  if (lang === 'he' && item.nameHe) return item.nameHe;
  if (lang === 'en') return item.nameEn;
  return item.name;
}

/** Helper: get display ingredients for an item based on lang */
export function getItemIngredients(item: MenuItem, lang: string): string {
  if (lang === 'he' && item.ingredientsHe) return item.ingredientsHe;
  if (lang === 'en') return item.ingredientsEn;
  return item.ingredients;
}

/** Helper: get display category name based on lang */
export function getCategoryName(cat: MenuCategory, lang: string): string {
  if (lang === 'he' && cat.categoryHe) return cat.categoryHe;
  if (lang === 'en') return cat.categoryEn;
  return cat.category;
}

/** Helper: resolve full image path if shorthand is used */
export function resolveImagePath(image: string | undefined | null, categorySlug: string): string | null {
  if (!image) return null;

  let processed = image;
  // Auto-fix: if it starts with /img/ but not /img/products/, insert it
  if (processed.startsWith('/img/') && !processed.startsWith('/img/products/')) {
    processed = processed.replace('/img/', '/img/products/');
  }

  // If it's already a full path or URL, return as is
  if (processed.startsWith('/') || processed.startsWith('http')) {
    return processed;
  }
  
  // Otherwise, assume it's just a filename in the standard category folder
  return `/img/products/${categorySlug}/${processed}`;
}

/** Helper: resolve image path specifically for a MenuItem */
export function getItemImage(item: MenuItem, categorySlug: string): string | null {
  return resolveImagePath(item.image, categorySlug);
}
