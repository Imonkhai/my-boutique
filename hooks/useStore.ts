'use client';
import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/types';

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored));
    } catch {}
  }, [key]);

  const set = useCallback((v: T | ((prev: T) => T)) => {
    setValue(prev => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);

  return [value, set] as const;
}

export function useCart() {
  const [items, setItems] = useLocalStorage<CartItem[]>('veloura-cart', []);

  const addItem = useCallback((product: Product, qty = 1, size?: string, color?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedSize === size && i.selectedColor === color);
      if (existing) return prev.map(i => i.id === product.id && i.selectedSize === size ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { ...product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
  }, [setItems]);

  const removeItem = useCallback((id: string) => setItems(prev => prev.filter(i => i.id !== id)), [setItems]);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  }, [setItems]);

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQty, clearCart, total, count };
}

export function useWishlist() {
  const [items, setItems] = useLocalStorage<Product[]>('veloura-wishlist', []);

  const toggle = useCallback((product: Product) => {
    setItems(prev => prev.find(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product]);
  }, [setItems]);

  const isWishlisted = useCallback((id: string) => items.some(i => i.id === id), [items]);

  return { items, toggle, isWishlisted, count: items.length };
}
