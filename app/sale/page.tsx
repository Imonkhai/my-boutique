import type { Metadata } from 'next';
import { PRODUCTS } from '@/constants';
import ProductCard from '@/components/product/ProductCard';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'Sale — Up to 40% Off',
  description: 'Shop our end of season sale at Gift Collection. Up to 40% off selected pieces.',
};

export default function SalePage() {
  const products = PRODUCTS.filter(p => p.badge === 'sale' || p.discount);

  return (
    <div className="pt-[88px]">
      <div
        className="py-16 lg:py-24 text-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#111111]/80" />
        <div className="relative z-10 text-white">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Limited Time</p>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold mb-3">End of Season Sale</h1>
          <p className="text-white/70 text-lg">Up to 40% off on selected pieces</p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="mb-8">
          <p className="text-[#6B6B6B] text-sm">{products.length} sale items</p>
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
