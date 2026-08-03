'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Share2, ChevronRight, ZoomIn } from 'lucide-react';
import { PRODUCTS } from '@/constants';
import { useCart, useWishlist } from '@/hooks/useStore';
import { useToast } from '@/components/ui/Toaster';
import { formatPrice } from '@/utils';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import ProductCard from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Animations';

export default function ProductDetailPage() {
  const product = PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { toast } = useToast();

  const images = [product.image, product.hoverImage || product.image, product.image, product.hoverImage || product.image];
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 1) {
      toast('Please select a size', 'error');
      return;
    }
    addItem(product, quantity, selectedSize || product.sizes?.[0], selectedColor);
    toast(`${product.name} added to cart`, 'success');
    window.dispatchEvent(new CustomEvent('open-cart'));
  };

  return (
    <div className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#111111]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-[#111111]">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-[#111111]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="flex gap-4">
            <div className="hidden sm:flex flex-col gap-3 w-20">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-[#D4AF37]' : 'border-transparent'}`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
            <div
              className="flex-1 relative aspect-[3/4] overflow-hidden bg-[#F8F8F8] group cursor-zoom-in"
              onClick={() => setZoomed(!zoomed)}
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badge}>
                    {product.badge === 'sale' && product.discount ? `-${product.discount}%` : product.badge}
                  </Badge>
                </div>
              )}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-white flex items-center justify-center shadow">
                  <ZoomIn size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <Reveal>
            <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-2">{product.category}</p>
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[#111111] mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={product.rating} reviews={product.reviews} size="md" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-semibold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-[#6B6B6B] line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="sale">-{product.discount}%</Badge>
                </>
              )}
            </div>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">{product.description}</p>
            <div className="flex items-center gap-2 mb-6 text-sm">
              <span className="text-[#6B6B6B]">Material:</span>
              <span className="font-medium">{product.material}</span>
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="mb-6">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#111111] mb-3">Color</p>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-[#D4AF37] scale-110' : 'border-transparent hover:border-[#E5E5E5]'}`}
                      style={{ backgroundColor: color, boxShadow: color === '#FFFFFF' ? 'inset 0 0 0 1px #E5E5E5' : undefined }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#111111]">Size</p>
                  <button className="text-[11px] text-[#D4AF37] underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-11 px-3 text-sm font-medium border transition-all ${selectedSize === size ? 'bg-[#111111] text-white border-[#111111]' : 'border-[#E5E5E5] text-[#111111] hover:border-[#111111]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-[#6B6B6B]">{product.inStock ? 'In Stock — Ready to Ship' : 'Out of Stock'}</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#E5E5E5]">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-[#F8F8F8] transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-6 py-3 text-sm font-medium min-w-[60px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 hover:bg-[#F8F8F8] transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-4 bg-[#111111] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={() => { toggle(product); toast(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist', 'success'); }}
                className={`w-14 h-14 border flex items-center justify-center transition-all ${isWishlisted(product.id) ? 'bg-[#D4AF37] border-[#D4AF37] text-[#111111]' : 'border-[#E5E5E5] text-[#111111] hover:border-[#D4AF37]'}`}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
              <button className="w-14 h-14 border border-[#E5E5E5] flex items-center justify-center hover:border-[#111111] transition-colors" aria-label="Share">
                <Share2 size={18} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-4 bg-[#D4AF37] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#C4A030] transition-all duration-300 disabled:opacity-50"
            >
              Buy Now
            </button>
          </Reveal>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <Reveal className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-[#111111]">You May Also Like</h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
