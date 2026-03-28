'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/app/[locale]/layout';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, maxWidth = "sm:w-[450px]" }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex justify-center items-end sm:items-center bg-black/60 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div 
        className={cn(
          "bg-dark w-full sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] transform transition-transform duration-300",
          maxWidth,
          isOpen ? "translate-y-0" : "translate-y-full sm:translate-y-10"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10 shrink-0">
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-grow custom-scrollbar">
          {children}
        </div>

        {footer && (
          <div className="p-4 border-t border-white/10 bg-card rounded-b-2xl sm:rounded-b-2xl shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
