import Image from 'next/image';
import Link from 'next/link';
import { Award, Leaf, Truck, RefreshCw } from 'lucide-react';
import { Reveal } from '@/components/ui/Animations';

const features = [
  { icon: Award, title: 'Premium Quality', desc: 'Every piece is crafted from the finest materials, selected by our expert team.' },
  { icon: Leaf, title: 'Sustainably Made', desc: 'We partner with ethical manufacturers committed to sustainable practices.' },
  { icon: Truck, title: 'Free Delivery', desc: 'Complimentary shipping on all orders over $150, worldwide.' },
  { icon: RefreshCw, title: '30-Day Returns', desc: 'Shop with confidence. Easy returns within 30 days of purchase.' },
];

export default function BrandStory() {
  return (
    <>
      {/* Brand Story */}
      <section className="py-20 lg:py-28 bg-[#111111] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal variant="slideInLeft">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                    alt="Gift Collection Brand Story"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#D4AF37] flex items-center justify-center p-6 hidden lg:flex">
                  <div className="text-center text-[#111111]">
                    <div className="font-display text-3xl font-bold">15+</div>
                    <div className="text-[10px] tracking-widest uppercase mt-1">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-4">Our Story</p>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                Born from a Passion for Timeless Elegance
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Founded in Paris in 2009, Gift Collection was born from a singular vision: to make luxury fashion accessible to women who appreciate quality, craftsmanship, and enduring style.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Every piece in our collection is personally curated by our creative team, ensuring that each garment meets our exacting standards for quality, fit, and elegance.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#D4AF37] border-b border-[#D4AF37] pb-0.5 hover:text-white hover:border-white transition-colors"
              >
                Discover Our Story →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-[#F8F8F8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Why Gift Collection</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111]">The Gift Collection Difference</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1} className="text-center group">
                <div className="w-14 h-14 bg-white border border-[#E5E5E5] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                  <f.icon size={22} className="text-[#D4AF37] group-hover:text-[#111111] transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#111111] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
