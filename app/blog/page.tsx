import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/constants';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export const metadata: Metadata = {
  title: 'Style Journal',
  description: 'Fashion insights, style guides, and trend reports from Gift Collection.',
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Insights & Inspiration</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Style Journal</h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Featured */}
        <Reveal className="mb-16">
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#D4AF37] text-[#111111] text-[10px] font-semibold tracking-widest uppercase px-3 py-1">
                  Featured
                </span>
              </div>
            </div>
            <div>
              <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase font-semibold">{featured.category}</span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-[#111111] mt-3 mb-4 group-hover:text-[#D4AF37] transition-colors">
                {featured.title}
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-[#6B6B6B] mb-6">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime} min</span>
              </div>
              <span className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#D4AF37] font-medium">
                Read Article <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map(post => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D4AF37] text-[#111111] text-[10px] font-semibold tracking-widest uppercase px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#6B6B6B] text-xs mb-3">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{post.readTime} min</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#111111] mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] line-clamp-2 mb-4">{post.excerpt}</p>
                <span className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#D4AF37] font-medium">
                  Read More <ArrowRight size={12} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}
