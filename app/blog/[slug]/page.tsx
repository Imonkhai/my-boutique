import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/constants';
import { Reveal } from '@/components/ui/Animations';

export const metadata: Metadata = { title: 'Blog Post' };

export default function BlogPostPage() {
  const post = BLOG_POSTS[0];
  const related = BLOG_POSTS.slice(1);

  return (
    <div className="pt-[88px]">
      {/* Hero */}
      <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-[#111111]/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="bg-[#D4AF37] text-[#111111] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="font-display text-3xl lg:text-5xl font-semibold text-white max-w-3xl">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-8 pb-8 border-b border-[#E5E5E5]">
          <span className="font-medium text-[#111111]">{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock size={13} />{post.readTime} min read</span>
        </div>

        {/* Content */}
        <Reveal>
          <div className="prose prose-lg max-w-none">
            <p className="text-[#6B6B6B] leading-relaxed text-lg mb-6">{post.excerpt}</p>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              Fashion is not merely about clothing — it is a language, a form of self-expression that transcends trends and seasons. At Veloura, we believe in the power of a well-curated wardrobe to transform not just how you look, but how you feel.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              The key to building a capsule wardrobe lies in selecting pieces that work harmoniously together. Start with a foundation of neutral tones — ivory, black, camel, and grey — then layer in accent pieces that reflect your personal aesthetic.
            </p>
            <blockquote className="border-l-4 border-[#D4AF37] pl-6 my-8">
              <p className="font-display text-xl text-[#111111] italic">
                "Style is a way to say who you are without having to speak."
              </p>
              <cite className="text-sm text-[#6B6B6B] mt-2 block">— Rachel Zoe</cite>
            </blockquote>
            <p className="text-[#6B6B6B] leading-relaxed">
              Invest in quality over quantity. A single beautifully crafted cashmere blazer will serve you better than five fast-fashion alternatives. Choose pieces that age gracefully and tell a story.
            </p>
          </div>
        </Reveal>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#E5E5E5]">
          <Link href="/blog" className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#6B6B6B] hover:text-[#111111] transition-colors">
            <ArrowLeft size={14} /> All Articles
          </Link>
          {related[0] && (
            <Link href={`/blog/${related[0].slug}`} className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#D4AF37] hover:text-[#111111] transition-colors">
              Next Article <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
