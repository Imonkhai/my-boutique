'use client';
import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Share2, ChevronRight, ZoomIn } from 'lucide-react';
import { PRODUCTS } from '@/constants';
import { useCart, useWishlist } from '@/hooks/useStore';
import { useToast } from '@/components/ui/Toaster';
import { formatPrice } from '@/utils';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import ProductCard from '@/components/product/ProductCard';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/ui/Animations';

interface Props { params: Promise<{ slug: string }> }

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) notFound();
  return <ProductDetail slug={slug} />;
}

// Separate client component so hooks work after the notFound() guard
function ProductDetail({ slug }: { slug: string }) {
  const product = PRODUCTS.find(p => p.slug === slug)!;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { toast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const images = Array.from(new Set([
    product.image,
    product.hoverImage,
    product.image,
    product.hoverImage,
  ])).filter(Boolean) as string[];

  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast('Please select a size', 'error');
      return;
    }
    addItem(product, quantity, selectedSize, selectedColor);
    toast(`${product.name} added to cart`, 'success');
    window.dispatchEvent(new CustomEvent('open-cart'));
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const handleWishlist = () => {
    const wasWishlisted = wishlisted;
    toggle(product);
    toast(
      wasWishlisted ? 'Removed from wishlist' : `${product.name} added to wishlist`,
      wasWishlisted ? 'info' : 'success'
    );
  };

  return (
    <div className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-[#111111] transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#111111] transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#111111] truncate max-w-[160px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Image Gallery ── */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-3 w-20 shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-[#D4AF37]' : 'border-transparent hover:border-[#E5E5E5]'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div
              className="flex-1 relative aspect-[3/4] overflow-hidden bg-[#F8F8F8] group cursor-zoom-in"
              onClick={() => setZoomed(z => !z)}
            >
              <Image
                src={images[selectedImage] ?? product.image}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant={product.badge}>
                    {product.badge === 'sale' && product.discount ? `-${product.discount}%` : product.badge}
                  </Badge>
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#6B6B6B]">Sold Out</span>
                </div>
              )}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="w-8 h-8 bg-white flex items-center justify-center shadow">
                  <ZoomIn size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Product Details ── */}
          <Reveal>
            <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-2">{product.category}</p>
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[#111111] mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-5">
              <StarRating rating={product.rating} reviews={product.reviews} size="md" />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-semibold text-[#111111]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-[#6B6B6B] line-through text-sm">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="sale">-{product.discount}%</Badge>
                </>
              )}
            </div>

            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">{product.description}</p>

            {product.material && (
              <div className="flex items-center gap-2 mb-6 text-sm border-t border-[#F0F0F0] pt-5">
                <span className="text-[#6B6B6B]">Material:</span>
                <span className="font-medium text-[#111111]">{product.material}</span>
              </div>
            )}

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-3">
                  Colour
                  {selectedColor && (
                    <span className="ml-2 text-[#D4AF37] normal-case font-normal tracking-normal">
                      — {selectedColor}
                    </span>
                  )}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-[#D4AF37] scale-110 shadow-md'
                          : 'border-transparent hover:border-[#E5E5E5] hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: color,
                        boxShadow: color === '#FFFFFF' || color === '#F5F5DC'
                          ? 'inset 0 0 0 1px #E5E5E5'
                          : undefined,
                      }}
                      aria-label={`Select colour ${color}`}
                      aria-pressed={selectedColor === color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#111111]">
                    Size
                    {selectedSize && (
                      <span className="ml-2 text-[#D4AF37] normal-case font-normal tracking-normal">
                        — {selectedSize}
                      </span>
                    )}
                  </p>
                  <button className="text-[11px] text-[#D4AF37] underline hover:text-[#111111] transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-11 px-3 text-sm font-medium border transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'border-[#E5E5E5] text-[#111111] hover:border-[#111111] hover:bg-[#F8F8F8]'
                      }`}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-[#6B6B6B]">
                {product.inStock ? 'In Stock — Ready to Ship' : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#111111]">Qty</p>
              <div className="flex items-center border border-[#E5E5E5]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-6 py-3 text-sm font-semibold min-w-[56px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-4 bg-[#111111] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-200 ${
                  wishlisted
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#111111]'
                    : 'border-[#E5E5E5] text-[#111111] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
              <button
                className="w-14 h-14 border border-[#E5E5E5] flex items-center justify-center hover:border-[#111111] transition-colors"
                aria-label="Share product"
              >
                <Share2 size={18} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="w-full py-4 bg-[#D4AF37] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#C4A030] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-[#F0F0F0] grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Free Shipping', sub: 'Orders over $150' },
                { label: 'Easy Returns', sub: '30-day policy' },
                { label: 'Secure Payment', sub: 'SSL encrypted' },
              ].map(b => (
                <div key={b.label}>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-[#111111]">{b.label}</p>
                  <p className="text-[10px] text-[#6B6B6B] mt-0.5">{b.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <Reveal className="text-center mb-12">
              <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">More to Love</p>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-[#111111]">You May Also Like</h2>
            </Reveal>
            <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map(p => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        )}
      </div>
    </div>
  );
}
