'use client';
import { ToastProvider } from '@/components/ui/Toaster';
import { Toaster } from '@/components/ui/Toaster';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
}
