import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { COLLECTIONS } from '@/constants';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore our curated fashion collections at Gift Collection.',
};

export default function CollectionsPage() {
  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Curated For You</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Collections</h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {COLLECTIONS.map((col, i) => (
            <StaggerItem key={col.id}>
              <Link href={`/collections/${col.slug}`} className="group block relative overflow-hidden">
                <div className={`relative overflow-hidden ${i % 3 === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase mb-2">{col.itemCount} pieces</p>
                    <h2 className="font-display text-3xl font-semibold text-white mb-2">{col.name}</h2>
                    <p className="text-white/70 text-sm mb-4">{col.description}</p>
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-white border-b border-[#D4AF37] pb-0.5 group-hover:text-[#D4AF37] transition-colors">
                      Shop Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}
