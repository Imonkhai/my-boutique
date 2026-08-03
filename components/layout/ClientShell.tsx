'use client';
import CartDrawer from '@/components/layout/CartDrawer';
import BackToTop from '@/components/ui/BackToTop';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Toaster } from '@/components/ui/Toaster';

export default function ClientShell() {
  return (
    <>
      <CartDrawer />
      <BackToTop />
      <WhatsAppButton />
      <Toaster />
    </>
  );
}
