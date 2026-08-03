import type { Metadata } from 'next';
import { Reveal } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Veloura Boutique Terms and Conditions of use and purchase.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using the Veloura Boutique website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.',
  },
  {
    title: '2. Products and Pricing',
    content: 'All prices are displayed in USD and are subject to change without notice. We reserve the right to modify or discontinue any product at any time. We are not liable to you or any third party for any modification, suspension, or discontinuation of products.',
  },
  {
    title: '3. Orders and Payment',
    content: 'By placing an order, you represent that you are of legal age and have the legal right to use the payment method provided. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase.',
  },
  {
    title: '4. Shipping and Delivery',
    content: 'We aim to dispatch all orders within 1-2 business days. Delivery times vary by location. We are not responsible for delays caused by customs, postal services, or other factors outside our control.',
  },
  {
    title: '5. Returns and Refunds',
    content: 'We accept returns within 30 days of purchase for unworn items in their original condition with tags attached. Refunds will be processed within 5-10 business days of receiving the returned item.',
  },
  {
    title: '6. Intellectual Property',
    content: 'All content on this website, including text, graphics, logos, and images, is the property of Veloura Boutique and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without our express written permission.',
  },
  {
    title: '7. Limitation of Liability',
    content: 'Veloura Boutique shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim.',
  },
];

export default function TermsPage() {
  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Terms & Conditions</h1>
        <p className="text-white/60 mt-3 text-sm">Last updated: January 1, 2025</p>
      </div>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Reveal>
          <p className="text-[#6B6B6B] leading-relaxed mb-12">
            Please read these Terms and Conditions carefully before using the Veloura Boutique website. These terms govern your use of our website and the purchase of products from us.
          </p>
        </Reveal>
        <div className="space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.05}>
              <h2 className="font-display text-xl font-semibold text-[#111111] mb-3">{section.title}</h2>
              <p className="text-[#6B6B6B] leading-relaxed text-sm">{section.content}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
