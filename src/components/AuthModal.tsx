'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Lock, User, LogIn, UserPlus, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const t = useTranslations();
  const { user, signOut } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name },
          },
        });
        if (signUpError) throw signUpError;
        alert(t('registerSuccessMsg'));
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Auth error');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={t('profileTitle')}>
        <div className="space-y-6 pt-4 px-1">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center text-3xl font-black text-brand mb-4 shadow-[0_0_20px_rgba(230,57,70,0.1)]">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {user.user_metadata?.display_name || user.email?.split('@')[0]}
            </h3>
            <p className="text-sm text-muted/80">{user.email}</p>
          </div>
          
          <div className="bg-card/40 rounded-2xl p-4 border border-white/5 space-y-4 shadow-inner">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-muted/70 font-medium uppercase tracking-wider">{t('emailLabel')}</span>
              <span className="text-white/90 font-bold">{user.email}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              signOut();
              onClose();
            }}
            className="w-full bg-white/5 text-red-500 font-bold py-3.5 rounded-xl border border-red-500/20 active:bg-red-500/10 transition uppercase text-[11px] tracking-[0.2em]"
          >
            {t('logoutBtn')}
          </button>
        </div>
      </Modal>
    );
  }

  const footer = (
    <div className="text-center text-xs text-muted">
      {mode === 'login' ? (
        <p>
          {t('noAccount')} 
          <button onClick={() => setMode('register')} className="text-brand font-bold ml-1 hover:underline">
            {t('registerBtn')}
          </button>
        </p>
      ) : (
        <p>
          {t('hasAccount')} 
          <button onClick={() => setMode('login')} className="text-brand font-bold ml-1 hover:underline">
            {t('loginBtn')}
          </button>
        </p>
      )}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'login' ? t('loginTitle') : t('registerTitle')} footer={footer}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3.5 rounded-xl flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {mode === 'register' && (
          <div>
            <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide opacity-70">
              {t('nameLabel')}
            </label>
            <div className="relative group">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 group-focus-within:text-brand transition-colors duration-300">
                <User className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                className="w-full bg-card border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-brand/40 focus:ring-4 focus:ring-brand/5 transition-all text-sm"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide opacity-70">
            {t('emailLabel')}
          </label>
          <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 group-focus-within:text-brand transition-colors duration-300">
              <Mail className="w-4 h-4" />
            </div>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full bg-card border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-brand/40 focus:ring-4 focus:ring-brand/5 transition-all text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-muted mb-1.5 ml-1 uppercase tracking-wide opacity-70">
            {t('passwordLabel')}
          </label>
          <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 group-focus-within:text-brand transition-colors duration-300">
              <Lock className="w-4 h-4" />
            </div>
            <input 
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-card border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-brand/40 focus:ring-4 focus:ring-brand/5 transition-all text-sm"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-brand text-white font-black py-4 rounded-xl active:scale-[0.98] transition shadow-lg shadow-brand/20 flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em] mt-3 group"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span className="group-hover:translate-x-1 transition-transform">{mode === 'login' ? t('loginSubmit') : t('registerSubmit')}</span>
              {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </>
          )}
        </button>
      </form>
    </Modal>
  );
}
