'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronRight, 
  Image as ImageIcon,
  Check,
  X,
  Loader2
} from 'lucide-react';
import { ProductEditorModal } from '@/components/ProductEditorModal';
import { cn } from '@/app/[locale]/layout';

export default function AdminPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('id', { ascending: true });
    
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.name_en || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Nav / Quick Stats */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative group flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-brand transition-colors w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-white/10 rounded-xl pl-10 pr-4 py-3 placeholder-white/20 outline-none focus:border-brand transition text-sm"
          />
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-brand text-white font-black px-6 py-3 rounded-xl active:scale-95 transition shadow-lg shadow-brand/20 flex items-center gap-2 uppercase text-[11px] tracking-[0.2em]"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-card/40 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Product</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Category</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Price</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Stock</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2 className="w-10 h-10 text-brand animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-dark overflow-hidden relative border border-white/10 shrink-0">
                        {p.image_url ? (
                          <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-muted m-auto absolute inset-0" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px]">{p.name}</div>
                        <div className="text-[11px] text-muted line-clamp-1 opacity-70">
                          {locale === 'ru' ? p.description : locale === 'he' ? p.description_he || p.description : p.description_en || p.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-muted">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-black text-white text-[15px]">
                    {p.price}₪
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={cn(
                      "w-3 h-3 rounded-full mx-auto",
                      p.is_available ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                    )} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingProduct(p);
                          setIsModalOpen(true);
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted hover:text-white hover:bg-white/10 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(p.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductEditorModal 
        isOpen={isModalOpen} 
        product={editingProduct} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchProducts} 
      />
    </div>
  );
}
