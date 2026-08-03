'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useStore';
import { formatPrice } from '@/utils';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQty, total, count } = useCart();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-cart', handler);
    return () => window.removeEventListener('open-cart', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] bg-black/50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 bottom-0 z-[201] w-full max-w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="font-display text-lg font-semibold">Your Cart</h2>
                {count > 0 && (
                  <span className="w-5 h-5 bg-[#D4AF37] text-[#111111] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:text-[#D4AF37] transition-colors" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-[#E5E5E5]" />
                  <p className="font-display text-lg text-[#6B6B6B]">Your cart is empty</p>
                  <p className="text-sm text-[#6B6B6B]">Add some beautiful pieces to get started.</p>
                  <Button onClick={() => setOpen(false)} variant="outline" size="sm" as="button">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map(item => (
                    <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                      <div className="relative w-20 h-24 shrink-0 bg-[#F8F8F8] overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        {item.selectedSize && <p className="text-xs text-[#6B6B6B] mt-0.5">Size: {item.selectedSize}</p>}
                        <p className="text-sm font-semibold text-[#D4AF37] mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-[#E5E5E5]">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-[#F8F8F8] transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-[#F8F8F8] transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-[#6B6B6B] hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#E5E5E5] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B6B6B]">Subtotal</span>
                  <span className="font-display text-lg font-semibold">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-[#6B6B6B]">Shipping and taxes calculated at checkout.</p>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-4 bg-[#111111] text-white text-[11px] font-medium tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-2 text-[11px] tracking-widest uppercase text-[#6B6B6B] hover:text-[#111111] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
