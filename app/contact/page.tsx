'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Globe, Rss, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toaster';
import { Reveal } from '@/components/ui/Animations';
import Button from '@/components/ui/Button';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '12 Rue de la Paix, Paris, France 75001' },
  { icon: Phone, label: 'Phone', value: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
  { icon: Mail, label: 'Email', value: 'hello@veloura.com', href: 'mailto:hello@veloura.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10:00–20:00 | Sun: 12:00–18:00' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1000));
    toast('Message sent! We\'ll be in touch within 24 hours.', 'success');
    reset();
  };

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Get in Touch</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Contact Us</h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-[#111111] mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-white"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-white"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject')}
                  className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-white"
                  placeholder="How can we help?"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full border border-[#E5E5E5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-white resize-none"
                  placeholder="Tell us more..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" loading={isSubmitting} size="lg" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.2}>
            <h2 className="font-display text-3xl font-semibold text-[#111111] mb-8">Visit Us</h2>
            <div className="space-y-6 mb-10">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[#6B6B6B] mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-[#111111] hover:text-[#D4AF37] transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-[#111111]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mb-10">
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[Globe, Rss, Share2].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center text-[#6B6B6B] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-[4/3] bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center">
              <div className="text-center text-[#6B6B6B]">
                <MapPin size={32} className="mx-auto mb-2 text-[#D4AF37]" />
                <p className="text-sm font-medium">12 Rue de la Paix</p>
                <p className="text-xs">Paris, France 75001</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
