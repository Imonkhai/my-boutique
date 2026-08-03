import type { Metadata } from 'next';
import { PRODUCTS } from '@/constants';
import ProductCard from '@/components/product/ProductCard';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'New Arrivals',
  description: 'Shop the latest arrivals at Gift Collection.',
};

export default function NewArrivalsPage() {
  const products = PRODUCTS.filter(p => p.badge === 'new');

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Just In</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">New Arrivals</h1>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="mb-8">
          <p className="text-[#6B6B6B] text-sm">{products.length} new pieces</p>
        </Reveal>
        <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map(product => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}
