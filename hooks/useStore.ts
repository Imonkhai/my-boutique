'use client';
import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/types';

// ─── Shared in-memory store ───────────────────────────────────────────────────
// All hook instances share the same reference so any mutation instantly
// re-renders every subscriber (Navbar badge, CartDrawer, checkout, etc.)

type Listener<T> = (value: T) => void;

function createStore<T>(key: string, initial: T) {
  let state: T = initial;
  const listeners = new Set<Listener<T>>();

  // Hydrate once from localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(key);
      if (stored) state = JSON.parse(stored);
    } catch {}
  }

  function get() { return state; }

  function set(v: T | ((prev: T) => T)) {
    state = typeof v === 'function' ? (v as (p: T) => T)(state) : v;
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
    listeners.forEach(l => l(state));
  }

  function subscribe(listener: Listener<T>) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { get, set, subscribe };
}

const cartStore     = createStore<CartItem[]>('gc-cart', []);
const wishlistStore = createStore<Product[]>('gc-wishlist', []);

function useStore<T>(store: ReturnType<typeof createStore<T>>) {
  const [value, setValue] = useState<T>(() => store.get());

  useEffect(() => {
    // Sync in case localStorage was already populated before this component mounted
    setValue(store.get());
    const unsub = store.subscribe(setValue);
    return () => { unsub(); };
  }, [store]);

  return [value, store.set] as const;
}

// ─── useCart ──────────────────────────────────────────────────────────────────
export function useCart() {
  const [items, setItems] = useStore(cartStore);

  const addItem = useCallback((product: Product, qty = 1, size?: string, color?: string) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
  }, [setItems]);

  const removeItem = useCallback((id: string, size?: string, color?: string) =>
    setItems(prev => prev.filter(i => !(i.id === id && i.selectedSize === size && i.selectedColor === color)))
  , [setItems]);

  const updateQty = useCallback((id: string, qty: number, size?: string, color?: string) => {
    setItems(prev =>
      qty <= 0
        ? prev.filter(i => !(i.id === id && i.selectedSize === size && i.selectedColor === color))
        : prev.map(i =>
            i.id === id && i.selectedSize === size && i.selectedColor === color
              ? { ...i, quantity: qty }
              : i
          )
    );
  }, [setItems]);

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQty, clearCart, total, count };
}

// ─── useWishlist ──────────────────────────────────────────────────────────────
export function useWishlist() {
  const [items, setItems] = useStore(wishlistStore);

  const toggle = useCallback((product: Product) => {
    setItems(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    );
  }, [setItems]);

  const isWishlisted = useCallback((id: string) => items.some(i => i.id === id), [items]);

  return { items, toggle, isWishlisted, count: items.length };
}
