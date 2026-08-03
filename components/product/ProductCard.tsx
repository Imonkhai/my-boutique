'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useCart, useWishlist } from '@/hooks/useStore';
import { useToast } from '@/components/ui/Toaster';
import { formatPrice } from '@/utils';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { toast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product, 1, product.sizes?.[0]);
    toast(`${product.name} added to cart`, 'success');
    window.dispatchEvent(new CustomEvent('open-cart'));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
    toast(wishlisted ? 'Removed from wishlist' : `${product.name} added to wishlist`, wishlisted ? 'info' : 'success');
  };

  return (
    <motion.div
      className={`group relative ${className ?? ''}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-product bg-[#F8F8F8] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${hovered && product.hoverImage ? 'opacity-0' : 'opacity-100'}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover transition-all duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant={product.badge}>
                {product.badge === 'sale' && product.discount ? `-${product.discount}%` : product.badge}
              </Badge>
            </div>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#6B6B6B]">Sold Out</span>
            </div>
          )}

          {/* Actions overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 p-3 flex gap-2"
          >
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 py-2.5 bg-[#111111] text-white text-[10px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              aria-label="Add to cart"
            >
              <ShoppingBag size={12} />
              Add to Cart
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} />
            </Link>
          </motion.div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
              wishlisted ? 'bg-[#D4AF37] text-[#111111]' : 'bg-white text-[#111111] opacity-0 group-hover:opacity-100'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div className="pt-3 pb-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-1">{product.category}</p>
          <h3 className="font-medium text-sm text-[#111111] truncate group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#6B6B6B] line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              {product.colors.slice(0, 4).map(color => (
                <span
                  key={color}
                  className="w-3.5 h-3.5 rounded-full border border-[#E5E5E5] cursor-pointer hover:scale-125 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
