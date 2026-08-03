'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }

const icons = { success: CheckCircle, error: AlertCircle, info: Info };
const colors = {
  success: 'bg-[#111111] text-white border-l-4 border-[#D4AF37]',
  error: 'bg-red-600 text-white border-l-4 border-red-400',
  info: 'bg-white text-[#111111] border-l-4 border-[#D4AF37] shadow',
};

// Utility to fire a toast from anywhere
export function showToast(message: string, type: Toast['type'] = 'success') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('veloura-toast', { detail: { message, type } }));
  }
}

// Hook for components that want to call showToast conveniently
export function useToast() {
  return { toast: showToast };
}

// The single Toaster display component — mount once in ClientShell
export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent<{ message: string; type: Toast['type'] }>).detail;
      const id = Math.random().toString(36).slice(2);
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    };
    window.addEventListener('veloura-toast', handler);
    return () => window.removeEventListener('veloura-toast', handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => {
          const Icon = icons[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 shadow-lg pointer-events-auto min-w-[260px] ${colors[t.type]}`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium flex-1">{t.message}</span>
              <button
                onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
                className="opacity-70 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Kept for backward compat — no-op wrapper
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
