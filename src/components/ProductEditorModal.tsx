'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { Modal } from '@/components/Modal';
import { Image as ImageIcon, Loader2, Save, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductEditorModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export function ProductEditorModal({ product, isOpen, onClose, onRefresh }: ProductEditorModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    name_en: '',
    name_he: '',
    description: '',
    description_en: '',
    description_he: '',
    price: 0,
    category: 'classic_rolls',
    image_url: '',
    is_available: true,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        name_en: '',
        name_he: '',
        description: '',
        description_en: '',
        description_he: '',
        price: 0,
        category: 'classic_rolls',
        image_url: '',
        is_available: true,
      });
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'number' ? parseFloat(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = product 
      ? await supabase.from('products').update(formData).eq('id', product.id)
      : await supabase.from('products').insert([formData]);

    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onRefresh();
        onClose();
      }, 1500);
    } else {
      alert(error.message);
    }
    setLoading(false);
  };

  const footer = (
    <button 
      type="submit" 
      form="product-form"
      disabled={loading || success}
      className={cn(
        "w-full font-black py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 uppercase text-[11px] tracking-[0.2em]",
        success ? "bg-green-500 text-white" : "bg-brand text-white shadow-brand/20 active:scale-95"
      )}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
        success ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />
      )}
      {success ? "Saved!" : (product ? "Save Changes" : "Create Product")}
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? "Edit Product" : "New Product"} footer={footer}>
      <form id="product-form" onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 ml-1">Name (RU)</label>
            <input id="name" required value={formData.name} onChange={handleChange} className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand transition text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 ml-1">Name (EN)</label>
            <input id="name_en" value={formData.name_en} onChange={handleChange} className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand transition text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 ml-1">Name (HE)</label>
          <input id="name_he" value={formData.name_he} onChange={handleChange} dir="rtl" className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand transition text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 ml-1">Category</label>
            <select id="category" value={formData.category} onChange={handleChange} className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand transition text-sm appearance-none">
              <option value="classic_rolls">Classic Rolls</option>
              <option value="baked_rolls">Baked Rolls</option>
              <option value="unusual_rolls">Unusual Rolls</option>
              <option value="burgers">Rice Burgers</option>
              <option value="gunkan">Gunkan/Sushi</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 ml-1">Price (₪)</label>
            <input id="price" type="number" required value={formData.price} onChange={handleChange} className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand transition text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 ml-1">Description (RU)</label>
          <textarea id="description" rows={2} value={formData.description} onChange={handleChange} className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand transition text-sm resize-none" />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 ml-1">Image URL</label>
          <input id="image_url" value={formData.image_url} onChange={handleChange} className="w-full bg-card border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-brand transition text-sm" />
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 transition-all hover:border-brand/20">
          <input 
            type="checkbox" 
            id="is_available" 
            checked={formData.is_available} 
            onChange={(e) => setFormData(prev => ({ ...prev, is_available: e.target.checked }))}
            className="w-5 h-5 rounded border-white/10 bg-card text-brand focus:ring-brand focus:ring-offset-dark"
          />
          <label htmlFor="is_available" className="text-sm font-bold text-white cursor-pointer select-none grow">
            Product is Available for Order
          </label>
          <div className={cn(
            "w-2 h-2 rounded-full",
            formData.is_available ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-red-500"
          )} />
        </div>
      </form>
    </Modal>
  );
}
