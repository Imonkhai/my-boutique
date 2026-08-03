import type { Metadata } from 'next';
import { Reveal } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Gift Collection Privacy Policy — how we collect, use, and protect your data.',
};

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, postal address, phone number, and payment information.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use the information we collect to process transactions, send transactional and promotional communications, provide customer support, and improve our services. We do not sell your personal information to third parties.',
  },
  {
    title: '3. Information Sharing',
    content: 'We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.',
  },
  {
    title: '4. Data Security',
    content: 'We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.',
  },
  {
    title: '5. Cookies',
    content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
  },
  {
    title: '6. Your Rights',
    content: 'You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages.',
  },
  {
    title: '7. Contact Us',
    content: 'If you have any questions about this Privacy Policy, please contact us at privacy@giftcollection.com or write to us at 12 Rue de la Paix, Paris, France 75001.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Privacy Policy</h1>
        <p className="text-white/60 mt-3 text-sm">Last updated: January 1, 2025</p>
      </div>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Reveal>
          <p className="text-[#6B6B6B] leading-relaxed mb-12">
            At Gift Collection, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
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
