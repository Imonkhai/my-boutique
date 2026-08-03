import type { CartItem, Order, OrderItem } from '@/types';

export const PROMO_CODES: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  GIFT10:   { type: 'percent', value: 10,    label: '10% off' },
  GIFT20:   { type: 'percent', value: 20,    label: '20% off' },
  WELCOME:  { type: 'fixed',   value: 5000,  label: '₦5,000 off' },
  LUXE50:   { type: 'fixed',   value: 10000, label: '₦10,000 off' },
};

export const SHIPPING_METHODS = [
  { id: 'standard',  label: 'Standard Delivery',  desc: '3–5 business days', price: 0,     threshold: 50000 },
  { id: 'express',   label: 'Express Delivery',   desc: '1–2 business days', price: 3500,  threshold: 0     },
  { id: 'overnight', label: 'Overnight Delivery', desc: 'Next business day',  price: 7000,  threshold: 0     },
] as const;

export type ShippingMethodId = typeof SHIPPING_METHODS[number]['id'];

export const TAX_RATE = 0.08; // 8%

export function calcShipping(subtotal: number, methodId: ShippingMethodId): number {
  const method = SHIPPING_METHODS.find(m => m.id === methodId)!;
  if (method.id === 'standard' && subtotal >= method.threshold) return 0;
  return method.price;
}

export function calcDiscount(subtotal: number, code: string): number {
  const promo = PROMO_CODES[code.toUpperCase()];
  if (!promo) return 0;
  if (promo.type === 'percent') return Math.round(subtotal * promo.value) / 100;
  return Math.min(promo.value, subtotal);
}

export function calcTax(subtotal: number, discount: number): number {
  return Math.round((subtotal - discount) * TAX_RATE * 100) / 100;
}

export function buildOrder(
  items: CartItem[],
  form: {
    email: string; phone: string;
    firstName: string; lastName: string;
    address: string; apartment?: string;
    city: string; state: string; zip: string; country: string;
    promoCode?: string;
  },
  shippingMethod: ShippingMethodId,
): Order {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = form.promoCode ? calcDiscount(subtotal, form.promoCode) : 0;
  const shipping = calcShipping(subtotal, shippingMethod);
  const tax = calcTax(subtotal, discount);
  const total = subtotal - discount + shipping + tax;

  const orderItems: OrderItem[] = items.map(i => ({
    id: i.id, name: i.name, price: i.price, quantity: i.quantity,
    image: i.image, selectedSize: i.selectedSize, selectedColor: i.selectedColor, slug: i.slug,
  }));

  return {
    id: `GC-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    items: orderItems,
    subtotal, shipping, tax, discount, total,
    promoCode: form.promoCode?.toUpperCase() || undefined,
    shippingMethod,
    contact: { email: form.email, phone: form.phone },
    shippingAddress: {
      firstName: form.firstName, lastName: form.lastName,
      address: form.address, apartment: form.apartment,
      city: form.city, state: form.state, zip: form.zip, country: form.country,
    },
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };
}
