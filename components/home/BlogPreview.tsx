import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/constants';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

export default function BlogPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Style Journal</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111]">Latest from the Blog</h2>
          </div>
          <Link href="/blog" className="text-[11px] tracking-widest uppercase text-[#111111] border-b border-[#D4AF37] pb-0.5 hover:text-[#D4AF37] transition-colors">
            View All →
          </Link>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
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
                  <span className="flex items-center gap-1"><Clock size={11} />{post.readTime} min read</span>
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
    </section>
  );
}
