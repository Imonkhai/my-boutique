import Link from 'next/link';
import { FAQS } from '@/constants';
import Accordion from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Animations';

export default function FAQPreview() {
  const items = FAQS.slice(0, 5).map(f => ({ id: f.id, question: f.question, answer: f.answer }));

  return (
    <section className="py-20 lg:py-28 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Got Questions?</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Find answers to the most common questions about shopping at Gift Collection.
            </p>
            <Link
              href="/faq"
              className="inline-flex text-[11px] tracking-widest uppercase text-[#111111] border-b border-[#D4AF37] pb-0.5 hover:text-[#D4AF37] transition-colors"
            >
              View All FAQs →
            </Link>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
