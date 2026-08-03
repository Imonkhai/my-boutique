'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useStore';
import ProductCard from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Animations';

export default function WishlistPage() {
  const { items, count } = useWishlist();

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Your Favourites</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">Wishlist</h1>
        {count > 0 && <p className="text-white/60 mt-3 text-sm">{count} {count === 1 ? 'item' : 'items'} saved</p>}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {items.length === 0 ? (
          <Reveal className="text-center py-20">
            <Heart size={56} className="mx-auto mb-5 text-[#E5E5E5]" />
            <h2 className="font-display text-2xl font-semibold text-[#111111] mb-3">Your wishlist is empty</h2>
            <p className="text-[#6B6B6B] mb-8">Save pieces you love and come back to them anytime.</p>
            <Link
              href="/shop"
              className="inline-flex px-8 py-3.5 bg-[#111111] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300"
            >
              Explore the Shop
            </Link>
          </Reveal>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
