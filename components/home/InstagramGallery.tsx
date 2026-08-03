import Image from 'next/image';
import { Share2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Animations';

const images = [
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
  'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
];

export default function InstagramGallery() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Follow Us</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111] mb-2">@VelouraBoutique</h2>
          <p className="text-[#6B6B6B] text-sm">Join our community of style-conscious women</p>
        </Reveal>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          {images.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={src}
                alt={`Instagram post ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <Share2 size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
