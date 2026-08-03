import Link from 'next/link';
import { Reveal } from '@/components/ui/Animations';

export default function NotFound() {
  return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center bg-[#F8F8F8]">
      <Reveal className="text-center px-4 max-w-lg mx-auto">
        <p className="font-display text-[120px] lg:text-[180px] font-bold text-[#E5E5E5] leading-none select-none">
          404
        </p>
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[#111111] -mt-4 mb-4">
          Page Not Found
        </h1>
        <p className="text-[#6B6B6B] mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back to something beautiful.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-[#111111] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3 border border-[#111111] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
