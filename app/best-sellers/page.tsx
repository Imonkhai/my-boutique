import type { Metadata } from 'next';
import { PRODUCTS } from '@/constants';
import ProductCard from '@/components/product/ProductCard';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'Best Sellers',
  description: 'Shop our most-loved pieces at Gift Collection.',
};

export default function BestSellersPage() {
  const products = PRODUCTS.filter(p => p.badge === 'bestseller' || p.rating >= 4.8);

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Most Loved</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Best Sellers</h1>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="mb-8">
          <p className="text-[#6B6B6B] text-sm">{products.length} bestselling pieces</p>
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
