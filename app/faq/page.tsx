import type { Metadata } from 'next';
import { FAQS } from '@/constants';
import Accordion from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Veloura Boutique — orders, returns, sizing, and more.',
};

const categories = ['All', 'Orders', 'Returns', 'Sizing', 'Payment', 'Products'];

export default function FAQPage() {
  const grouped = categories.slice(1).map(cat => ({
    category: cat,
    items: FAQS.filter(f => f.category === cat).map(f => ({ id: f.id, question: f.question, answer: f.answer })),
  })).filter(g => g.items.length > 0);

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Help Centre</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Frequently Asked Questions</h1>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {grouped.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.1} className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-[#111111] mb-6 pb-3 border-b border-[#E5E5E5]">
              {group.category}
            </h2>
            <Accordion items={group.items} />
          </Reveal>
        ))}

        <Reveal className="mt-16 text-center bg-[#F8F8F8] p-10">
          <h3 className="font-display text-2xl font-semibold text-[#111111] mb-3">Still have questions?</h3>
          <p className="text-[#6B6B6B] text-sm mb-6">Our team is here to help. Reach out and we'll respond within 24 hours.</p>
          <a
            href="/contact"
            className="inline-flex px-8 py-3 bg-[#111111] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300"
          >
            Contact Us
          </a>
        </Reveal>
      </div>
    </div>
  );
}
