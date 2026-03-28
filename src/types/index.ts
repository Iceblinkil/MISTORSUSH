export interface Product {
  id: string;
  name: string;
  name_en?: string;
  name_he?: string;
  price: number;
  description?: string;
  description_en?: string;
  description_he?: string;
  image_url: string;
  category: string;
  is_available: boolean;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
