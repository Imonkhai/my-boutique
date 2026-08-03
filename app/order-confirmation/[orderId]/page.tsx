'use client';
import { use, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/utils';
import type { Order } from '@/types';

function ConfirmationContent({ orderId }: { orderId: string }) {
  const searchParams = useSearchParams();

  const order = useMemo<Order | null>(() => {
    const raw = searchParams.get('data');
    if (!raw) return null;
    try { return JSON.parse(decodeURIComponent(raw)) as Order; } catch { return null; }
  }, [searchParams]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="font-display text-2xl">Order not found</p>
        <p className="text-[#6B6B6B]">Order ID: {orderId}</p>
        <Link href="/shop" className="text-[#D4AF37] hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  const estimatedDelivery = () => {
    const days = order.shippingMethod === 'overnight' ? 1 : order.shippingMethod === 'express' ? 2 : 5;
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="font-display text-xl font-bold tracking-wide">GIFT COLLECTION</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {/* Success banner */}
        <div className="bg-white p-8 text-center space-y-3">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h1 className="font-display text-2xl font-semibold">Order Confirmed!</h1>
          <p className="text-[#6B6B6B]">
            Thank you, {order.shippingAddress.firstName}. Your order has been placed successfully.
          </p>
          <div className="inline-block bg-[#F8F8F8] px-4 py-2 mt-2">
            <p className="text-xs text-[#6B6B6B] tracking-widest uppercase">Order Number</p>
            <p className="font-mono font-semibold text-[#D4AF37]">{order.id}</p>
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-white p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <Mail size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[#6B6B6B] tracking-widest uppercase mb-1">Confirmation sent to</p>
              <p className="text-sm font-medium">{order.contact.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Truck size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[#6B6B6B] tracking-widest uppercase mb-1">Estimated Delivery</p>
              <p className="text-sm font-medium">{estimatedDelivery()}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Package size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[#6B6B6B] tracking-widest uppercase mb-1">Ship to</p>
              <p className="text-sm font-medium">
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
            </div>
          </div>
        </div>

        {/* Order items */}
        <div className="bg-white p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold">Items Ordered</h2>
          <ul className="divide-y divide-[#E5E5E5]">
            {order.items.map(item => (
              <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="relative w-16 h-20 shrink-0 bg-[#F8F8F8] overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{item.name}</p>
                  <div className="flex gap-3 mt-0.5">
                    {item.selectedSize && <p className="text-xs text-[#6B6B6B]">Size: {item.selectedSize}</p>}
                    {item.selectedColor && (
                      <span className="w-3 h-3 rounded-full border border-[#E5E5E5] inline-block mt-0.5" style={{ backgroundColor: item.selectedColor }} />
                    )}
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="space-y-2 pt-4 border-t border-[#E5E5E5] text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#D4AF37]">
                <span>Discount {order.promoCode && `(${order.promoCode})`}</span>
                <span>−{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Shipping</span>
              <span>{order.shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between font-display text-base font-semibold pt-2 border-t border-[#E5E5E5]">
              <span>Total Paid</span>
              <span className="text-[#D4AF37]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="flex-1 py-4 bg-[#111111] text-white text-[11px] font-medium tracking-widest uppercase text-center hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
          <Link
            href="/account"
            className="flex-1 py-4 border border-[#111111] text-[11px] font-medium tracking-widest uppercase text-center hover:bg-[#111111] hover:text-white transition-all duration-300"
          >
            View My Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" /></div>}>
      <ConfirmationContent orderId={orderId} />
    </Suspense>
  );
}
