import type { Metadata } from 'next';
import { COLLECTIONS, PRODUCTS } from '@/constants';
import ProductCard from '@/components/product/ProductCard';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = { title: 'Collection' };

export default function CollectionDetailPage() {
  const collection = COLLECTIONS[0];
  const products = PRODUCTS.slice(0, 6);

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">{collection.itemCount} pieces</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">{collection.name}</h1>
        <p className="text-white/60 mt-3">{collection.description}</p>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerReveal className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
