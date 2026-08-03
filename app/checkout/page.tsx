'use client';
import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Lock, Tag, Truck, CreditCard, User, CheckCircle2, Loader2, X } from 'lucide-react';
import { useCart } from '@/hooks/useStore';
import { formatPrice } from '@/utils';
import { SHIPPING_METHODS, TAX_RATE, calcDiscount, calcShipping } from '@/lib/checkout';
import type { ShippingMethodId } from '@/lib/checkout';

// ─── Validation schemas ───────────────────────────────────────────────────────
const contactSchema = z.object({
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Valid phone required'),
});

const shippingSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName:  z.string().min(1, 'Required'),
  address:   z.string().min(5, 'Enter full address'),
  apartment: z.string().optional(),
  city:      z.string().min(1, 'Required'),
  state:     z.string().min(1, 'Required'),
  zip:       z.string().min(3, 'Required'),
  country:   z.string().min(1, 'Required'),
});

const paymentSchema = z.object({
  cardName:   z.string().min(2, 'Name on card required'),
  cardNumber: z.string()
    .transform(v => v.replace(/\s/g, ''))
    .pipe(z.string().length(16, 'Card number must be 16 digits').regex(/^\d+$/, 'Digits only')),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format MM/YY'),
  cvv:    z.string().regex(/^\d{3,4}$/, '3–4 digits'),
  saveInfo: z.boolean().optional(),
});

type ContactData  = z.infer<typeof contactSchema>;
type ShippingData = z.infer<typeof shippingSchema>;
type PaymentData  = z.infer<typeof paymentSchema>;

const STEPS = ['Contact', 'Shipping', 'Payment'] as const;
type Step = typeof STEPS[number];

// ─── Field component ──────────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6B6B6B] mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputCls = "w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#BBBBBB]";

// ─── Main component ───────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const { items, total: subtotal, clearCart } = useCart();

  const [step, setStep]               = useState<Step>('Contact');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>('standard');
  const [promoInput, setPromoInput]   = useState('');
  const [promoApplied, setPromoApplied] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError]   = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [hydrated, setHydrated]         = useState(false);

  // Collected data across steps
  const [contactData, setContactData]   = useState<ContactData | null>(null);
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);

  const shipping = calcShipping(subtotal, shippingMethod);
  const tax      = Math.round((subtotal - promoDiscount) * TAX_RATE * 100) / 100;
  const orderTotal = subtotal - promoDiscount + shipping + tax;

  // ── Contact form ──
  const contactForm = useForm<ContactData>({ resolver: zodResolver(contactSchema) });
  // ── Shipping form ──
  const shippingForm = useForm<ShippingData>({ resolver: zodResolver(shippingSchema) });
  // ── Payment form ──
  const paymentForm = useForm<PaymentData>({ resolver: zodResolver(paymentSchema) });

  // Wait for localStorage hydration before checking cart
  useEffect(() => { setHydrated(true); }, []);

  // Redirect if cart empty — only after hydration
  useEffect(() => {
    if (hydrated && items.length === 0 && step !== 'Payment') router.replace('/shop');
  }, [hydrated, items.length, step, router]);

  // ── Promo code ──
  const applyPromo = useCallback(async () => {
    if (!promoInput.trim()) return;
    setPromoLoading(true); setPromoError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setPromoApplied(promoInput.toUpperCase());
        setPromoDiscount(data.discount);
        setPromoError('');
      } else {
        setPromoError(data.error || 'Invalid code');
      }
    } catch {
      setPromoError('Could not validate code');
    } finally {
      setPromoLoading(false);
    }
  }, [promoInput, subtotal]);

  const removePromo = () => {
    setPromoApplied(''); setPromoDiscount(0); setPromoInput(''); setPromoError('');
  };

  // ── Step handlers ──
  const onContactSubmit = (data: ContactData) => { setContactData(data); setStep('Shipping'); };
  const onShippingSubmit = (data: ShippingData) => { setShippingData(data); setStep('Payment'); };

  const onPaymentSubmit = async (_data: PaymentData) => {
    if (!contactData || !shippingData) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          form: { ...contactData, ...shippingData, promoCode: promoApplied || undefined },
          shippingMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      clearCart();
      router.push(`/order-confirmation/${data.order.id}?data=${encodeURIComponent(JSON.stringify(data.order))}`);
    } catch (err) {
      paymentForm.setError('root', { message: err instanceof Error ? err.message : 'Order failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const stepIndex = STEPS.indexOf(step);

  // ── Card number formatter ──
  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-wide">GIFT COLLECTION</Link>
          <div className="flex items-center gap-1 text-xs text-[#6B6B6B]">
            <Lock size={12} className="text-[#D4AF37]" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Breadcrumb steps */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-xs">
          <Link href="/shop" className="text-[#6B6B6B] hover:text-[#D4AF37] transition-colors">Cart</Link>
          {STEPS.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <ChevronRight size={12} className="text-[#BBBBBB]" />
              <button
                onClick={() => i < stepIndex ? setStep(s) : undefined}
                className={`font-medium transition-colors ${
                  s === step ? 'text-[#111111]' : i < stepIndex ? 'text-[#D4AF37] hover:underline cursor-pointer' : 'text-[#BBBBBB] cursor-default'
                }`}
              >
                {s}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
        {/* ── Left: Forms ── */}
        <div className="space-y-6">

          {/* STEP 1: Contact */}
          {step === 'Contact' && (
            <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="bg-white p-8 space-y-5">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                <User size={18} className="text-[#D4AF37]" /> Contact Information
              </h2>
              <Field label="Email Address" error={contactForm.formState.errors.email?.message}>
                <input {...contactForm.register('email')} type="email" placeholder="you@example.com" className={inputCls} />
              </Field>
              <Field label="Phone Number" error={contactForm.formState.errors.phone?.message}>
                <input {...contactForm.register('phone')} type="tel" placeholder="+1 (555) 000-0000" className={inputCls} />
              </Field>
              <button type="submit" className="w-full py-4 bg-[#111111] text-white text-[11px] font-medium tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300">
                Continue to Shipping
              </button>
            </form>
          )}

          {/* STEP 2: Shipping */}
          {step === 'Shipping' && (
            <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="bg-white p-8 space-y-5">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                <Truck size={18} className="text-[#D4AF37]" /> Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" error={shippingForm.formState.errors.firstName?.message}>
                  <input {...shippingForm.register('firstName')} placeholder="Jane" className={inputCls} />
                </Field>
                <Field label="Last Name" error={shippingForm.formState.errors.lastName?.message}>
                  <input {...shippingForm.register('lastName')} placeholder="Doe" className={inputCls} />
                </Field>
              </div>
              <Field label="Address" error={shippingForm.formState.errors.address?.message}>
                <input {...shippingForm.register('address')} placeholder="123 Main Street" className={inputCls} />
              </Field>
              <Field label="Apartment, Suite, etc. (optional)">
                <input {...shippingForm.register('apartment')} placeholder="Apt 4B" className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" error={shippingForm.formState.errors.city?.message}>
                  <input {...shippingForm.register('city')} placeholder="New York" className={inputCls} />
                </Field>
                <Field label="State / Province" error={shippingForm.formState.errors.state?.message}>
                  <input {...shippingForm.register('state')} placeholder="NY" className={inputCls} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="ZIP / Postal Code" error={shippingForm.formState.errors.zip?.message}>
                  <input {...shippingForm.register('zip')} placeholder="10001" className={inputCls} />
                </Field>
                <Field label="Country" error={shippingForm.formState.errors.country?.message}>
                  <select {...shippingForm.register('country')} className={inputCls}>
                    <option value="">Select country</option>
                    {['United States','United Kingdom','Canada','Australia','France','Germany','Italy','Spain','Japan','UAE'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Shipping method */}
              <div className="pt-2">
                <p className="text-[11px] font-medium tracking-widest uppercase text-[#6B6B6B] mb-3">Shipping Method</p>
                <div className="space-y-2">
                  {SHIPPING_METHODS.map(m => (
                    <label key={m.id} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === m.id ? 'border-[#D4AF37] bg-[#FFFDF0]' : 'border-[#E5E5E5] hover:border-[#D4AF37]'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio" name="shipping" value={m.id}
                          checked={shippingMethod === m.id}
                          onChange={() => setShippingMethod(m.id)}
                          className="accent-[#D4AF37]"
                        />
                        <div>
                          <p className="text-sm font-medium">{m.label}</p>
                          <p className="text-xs text-[#6B6B6B]">{m.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        {m.id === 'standard' && subtotal >= 50000 ? 'FREE' : formatPrice(m.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-[#111111] text-white text-[11px] font-medium tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300">
                Continue to Payment
              </button>
            </form>
          )}

          {/* STEP 3: Payment */}
          {step === 'Payment' && (
            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="bg-white p-8 space-y-5">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                <CreditCard size={18} className="text-[#D4AF37]" /> Payment Details
              </h2>

              {/* Shipping summary */}
              {shippingData && (
                <div className="bg-[#F8F8F8] p-4 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Ship to</span>
                    <span className="font-medium">{shippingData.firstName} {shippingData.lastName}, {shippingData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Method</span>
                    <span className="font-medium">{SHIPPING_METHODS.find(m => m.id === shippingMethod)?.label}</span>
                  </div>
                  <button type="button" onClick={() => setStep('Shipping')} className="text-[#D4AF37] text-xs hover:underline mt-1">Edit</button>
                </div>
              )}

              <Field label="Name on Card" error={paymentForm.formState.errors.cardName?.message}>
                <input {...paymentForm.register('cardName')} placeholder="Jane Doe" className={inputCls} />
              </Field>
              <Field label="Card Number" error={paymentForm.formState.errors.cardNumber?.message}>
                <input
                  {...paymentForm.register('cardNumber')}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={inputCls}
                  onChange={e => {
                    e.target.value = formatCard(e.target.value);
                    paymentForm.setValue('cardNumber', e.target.value);
                  }}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry Date" error={paymentForm.formState.errors.expiry?.message}>
                  <input
                    {...paymentForm.register('expiry')}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={inputCls}
                    onChange={e => {
                      e.target.value = formatExpiry(e.target.value);
                      paymentForm.setValue('expiry', e.target.value);
                    }}
                  />
                </Field>
                <Field label="CVV" error={paymentForm.formState.errors.cvv?.message}>
                  <input {...paymentForm.register('cvv')} placeholder="123" maxLength={4} className={inputCls} />
                </Field>
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input {...paymentForm.register('saveInfo')} type="checkbox" className="accent-[#D4AF37]" />
                Save payment info for future orders
              </label>

              {paymentForm.formState.errors.root && (
                <p className="text-red-500 text-sm bg-red-50 p-3">{paymentForm.formState.errors.root.message}</p>
              )}

              <div className="flex items-center gap-2 text-xs text-[#6B6B6B] pt-1">
                <Lock size={12} className="text-[#D4AF37]" />
                <span>256-bit SSL encryption. Your payment info is never stored.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#111111] text-white text-[11px] font-medium tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : `Place Order · ${formatPrice(orderTotal)}`}
              </button>
            </form>
          )}
        </div>

        {/* ── Right: Order Summary ── */}
        <aside className="space-y-4">
          <div className="bg-white p-6 space-y-4">
            <h3 className="font-display text-lg font-semibold">Order Summary</h3>
            <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map(item => (
                <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                  <div className="relative w-16 h-20 shrink-0 bg-[#F8F8F8] overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#111111] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <div className="flex gap-2 mt-0.5">
                      {item.selectedSize && <p className="text-xs text-[#6B6B6B]">{item.selectedSize}</p>}
                      {item.selectedColor && (
                        <span className="w-3 h-3 rounded-full border border-[#E5E5E5] inline-block mt-0.5" style={{ backgroundColor: item.selectedColor }} />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#D4AF37] mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Promo code */}
            <div className="pt-2 border-t border-[#E5E5E5]">
              {promoApplied ? (
                <div className="flex items-center justify-between bg-[#FFFDF0] border border-[#D4AF37] px-3 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag size={14} className="text-[#D4AF37]" />
                    <span className="font-medium text-[#D4AF37]">{promoApplied}</span>
                    <span className="text-[#6B6B6B]">applied</span>
                  </div>
                  <button onClick={removePromo} className="text-[#6B6B6B] hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), applyPromo())}
                    placeholder="Promo code"
                    className="flex-1 border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    disabled={promoLoading}
                    className="px-4 py-2 bg-[#111111] text-white text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all disabled:opacity-60"
                  >
                    {promoLoading ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                  </button>
                </div>
              )}
              {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E5] text-sm">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#D4AF37]">
                  <span>Discount ({promoApplied})</span>
                  <span>−{formatPrice(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-display text-base font-semibold pt-2 border-t border-[#E5E5E5]">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="bg-white p-4 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: <Lock size={16} className="text-[#D4AF37] mx-auto mb-1" />, label: 'Secure Payment' },
              { icon: <Truck size={16} className="text-[#D4AF37] mx-auto mb-1" />, label: 'Free Returns' },
              { icon: <CheckCircle2 size={16} className="text-[#D4AF37] mx-auto mb-1" />, label: '30-Day Guarantee' },
            ].map(b => (
              <div key={b.label}>
                {b.icon}
                <p className="text-[10px] text-[#6B6B6B] leading-tight">{b.label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
