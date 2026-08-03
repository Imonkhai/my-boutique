import Link from 'next/link';
import { PRODUCTS } from '@/constants';
import ProductCard from '@/components/product/ProductCard';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export default function NewArrivals() {
  const newProducts = PRODUCTS.filter(p => p.badge === 'new').slice(0, 4);

  return (
    <section className="py-20 lg:py-28 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
        <div>
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Just In</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111]">New Arrivals</h2>
        </div>
        <Link
          href="/new-arrivals"
          className="text-[11px] tracking-widest uppercase text-[#111111] border-b border-[#D4AF37] pb-0.5 hover:text-[#D4AF37] transition-colors"
        >
          View All →
        </Link>
      </Reveal>

      <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {newProducts.map(product => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
