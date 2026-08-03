import type { Metadata } from 'next';
import Image from 'next/image';
import { TEAM_MEMBERS } from '@/constants';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';
import { Heart, Star, Globe, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Gift Collection — our story, mission, and the team behind the brand.',
};

const values = [
  { icon: Star, title: 'Excellence', desc: 'We hold every piece to the highest standard of quality and craftsmanship.' },
  { icon: Heart, title: 'Passion', desc: 'Fashion is our art. We pour love into every curation and every customer interaction.' },
  { icon: Globe, title: 'Inclusivity', desc: 'Elegance has no size, age, or background. We celebrate every woman.' },
  { icon: Leaf, title: 'Sustainability', desc: 'We are committed to ethical sourcing and reducing our environmental footprint.' },
];

const timeline = [
  { year: '2009', title: 'Founded in Paris', desc: 'Isabelle Gift opens the first boutique on Rue de la Paix.' },
  { year: '2012', title: 'First Online Store', desc: 'Gift Collection launches its e-commerce platform, reaching customers worldwide.' },
  { year: '2016', title: 'Sustainability Pledge', desc: 'We commit to 100% ethical sourcing across all product lines.' },
  { year: '2020', title: 'Global Expansion', desc: 'Gift Collection ships to over 50 countries, becoming a truly global boutique.' },
  { year: '2025', title: 'New Chapter', desc: 'Launching our most ambitious collection yet — a celebration of timeless style.' },
];

export default function AboutPage() {
  return (
    <div className="pt-[88px]">
      {/* Hero */}
      <div
        className="relative py-24 lg:py-36 flex items-center justify-center text-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#111111]/70" />
        <div className="relative z-10 text-white max-w-2xl mx-auto px-4">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-4">Our Story</p>
          <h1 className="font-display text-5xl lg:text-7xl font-semibold mb-4">About Gift Collection</h1>
          <p className="text-white/70 text-lg">Born from a passion for timeless elegance.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variant="slideInLeft">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Gift Collection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-4">Who We Are</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111] mb-6">
              Curating Elegance Since 2009
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Gift Collection was founded with a singular vision: to bring the finest luxury fashion to women who appreciate quality, craftsmanship, and enduring style. What began as a small Parisian boutique has grown into a globally recognised name in luxury fashion.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Every piece in our collection is personally curated by our creative team, ensuring that each garment meets our exacting standards. We believe that true luxury lies not in excess, but in the perfect balance of beauty, quality, and purpose.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-[#D4AF37] pl-4">
                <div className="font-display text-3xl font-bold text-[#111111]">15+</div>
                <div className="text-xs tracking-widest uppercase text-[#6B6B6B] mt-1">Years of Excellence</div>
              </div>
              <div className="border-l-2 border-[#D4AF37] pl-4">
                <div className="font-display text-3xl font-bold text-[#111111]">50+</div>
                <div className="text-xs tracking-widest uppercase text-[#6B6B6B] mt-1">Countries Served</div>
              </div>
              <div className="border-l-2 border-[#D4AF37] pl-4">
                <div className="font-display text-3xl font-bold text-[#111111]">10K+</div>
                <div className="text-xs tracking-widest uppercase text-[#6B6B6B] mt-1">Happy Clients</div>
              </div>
              <div className="border-l-2 border-[#D4AF37] pl-4">
                <div className="font-display text-3xl font-bold text-[#111111]">500+</div>
                <div className="text-xs tracking-widest uppercase text-[#6B6B6B] mt-1">Curated Pieces</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-[#111111] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">What We Stand For</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold">Our Values</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="text-center">
                <div className="w-14 h-14 border border-[#D4AF37] flex items-center justify-center mx-auto mb-5">
                  <v.icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">The People</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111]">Meet Our Team</h2>
        </Reveal>
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {TEAM_MEMBERS.map(member => (
            <StaggerItem key={member.id} className="text-center group">
              <div className="relative aspect-square overflow-hidden mb-5 mx-auto max-w-[280px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="280px"
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#111111]">{member.name}</h3>
              <p className="text-[#D4AF37] text-[11px] tracking-widest uppercase mt-1 mb-3">{member.role}</p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{member.bio}</p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-[#F8F8F8]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Our Journey</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111]">The Gift Collection Story</h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#E5E5E5]" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-[#D4AF37] text-[11px] tracking-widest uppercase font-semibold mb-1">{item.year}</div>
                      <h3 className="font-display text-lg font-semibold text-[#111111] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white shadow shrink-0 z-10" />
                    <div className="flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
