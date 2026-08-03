import Image from 'next/image';
import Link from 'next/link';
import { COLLECTIONS } from '@/constants';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export default function FeaturedCollections() {
  return (
    <section className="py-20 lg:py-28 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center mb-14">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Curated For You</p>
        <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111]">Featured Collections</h2>
      </Reveal>

      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {COLLECTIONS.map((col, i) => (
          <StaggerItem key={col.id}>
            <Link href={`/collections/${col.slug}`} className="group block relative overflow-hidden">
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase mb-1">{col.itemCount} pieces</p>
                  <h3 className="font-display text-xl font-semibold text-white mb-1">{col.name}</h3>
                  <p className="text-white/70 text-xs">{col.description}</p>
                  <span className="inline-block mt-3 text-[10px] tracking-widest uppercase text-white border-b border-[#D4AF37] pb-0.5 group-hover:text-[#D4AF37] transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
