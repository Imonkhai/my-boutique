import { NextRequest, NextResponse } from 'next/server';
import { buildOrder, calcDiscount, PROMO_CODES, SHIPPING_METHODS } from '@/lib/checkout';
import type { CartItem, Order } from '@/types';
import type { ShippingMethodId } from '@/lib/checkout';

// In-memory order store (replace with DB in production)
const orders = new Map<string, Order>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, form, shippingMethod } = body as {
      items: CartItem[];
      form: {
        email: string; phone: string;
        firstName: string; lastName: string;
        address: string; apartment?: string;
        city: string; state: string; zip: string; country: string;
        promoCode?: string;
      };
      shippingMethod: ShippingMethodId;
    };

    // Validate
    if (!items?.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    if (!form?.email || !form?.firstName || !form?.address)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    if (!SHIPPING_METHODS.find(m => m.id === shippingMethod))
      return NextResponse.json({ error: 'Invalid shipping method' }, { status: 400 });

    // Validate promo code if provided
    if (form.promoCode) {
      const promo = PROMO_CODES[form.promoCode.toUpperCase()];
      if (!promo) return NextResponse.json({ error: 'Invalid promo code' }, { status: 400 });
    }

    const order = buildOrder(items, form, shippingMethod);
    orders.set(order.id, order);

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('id');
  if (!orderId) return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
  const order = orders.get(orderId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json({ order });
}

// Promo code validation endpoint
export async function PUT(req: NextRequest) {
  const { code, subtotal } = await req.json();
  if (!code) return NextResponse.json({ error: 'Code required' }, { status: 400 });
  const promo = PROMO_CODES[code.toUpperCase()];
  if (!promo) return NextResponse.json({ valid: false, error: 'Invalid promo code' }, { status: 200 });
  const discount = calcDiscount(subtotal, code);
  return NextResponse.json({ valid: true, discount, label: promo.label });
}
