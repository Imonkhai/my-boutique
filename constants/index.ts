import type { Product, Collection, BlogPost, Testimonial, TeamMember, FAQ, NavLink } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  {
    label: 'Collections', href: '/collections',
    children: [
      { label: 'New Arrivals', href: '/new-arrivals' },
      { label: 'Best Sellers', href: '/best-sellers' },
      { label: 'Sale', href: '/sale' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Silk Wrap Dress', price: 285, originalPrice: 380, discount: 25,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    category: 'Dresses', rating: 4.8, reviews: 124, badge: 'sale',
    colors: ['#111111', '#D4AF37', '#8B4513'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true, slug: 'silk-wrap-dress',
    description: 'Luxurious silk wrap dress with a flattering silhouette.',
    material: '100% Pure Silk',
  },
  {
    id: '2', name: 'Cashmere Blazer', price: 420,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=600&q=80',
    category: 'Blazers', rating: 4.9, reviews: 89, badge: 'bestseller',
    colors: ['#111111', '#F5F5DC', '#808080'], sizes: ['XS', 'S', 'M', 'L'],
    inStock: true, slug: 'cashmere-blazer',
    description: 'Premium cashmere blazer for the modern woman.',
    material: '100% Cashmere',
  },
  {
    id: '3', name: 'Linen Wide-Leg Trousers', price: 195,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    category: 'Trousers', rating: 4.7, reviews: 67, badge: 'new',
    colors: ['#F5F5DC', '#111111', '#D2B48C'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true, slug: 'linen-wide-leg-trousers',
    description: 'Effortlessly chic linen trousers with a wide-leg cut.',
    material: '100% Linen',
  },
  {
    id: '4', name: 'Structured Leather Bag', price: 650, originalPrice: 850, discount: 24,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    category: 'Bags', rating: 5.0, reviews: 203, badge: 'sale',
    colors: ['#111111', '#8B4513', '#D4AF37'], sizes: ['One Size'],
    inStock: true, slug: 'structured-leather-bag',
    description: 'Handcrafted Italian leather bag with gold hardware.',
    material: 'Full-Grain Italian Leather',
  },
  {
    id: '5', name: 'Merino Knit Sweater', price: 245,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    category: 'Knitwear', rating: 4.6, reviews: 45, badge: 'new',
    colors: ['#F5F5DC', '#D2B48C', '#808080'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true, slug: 'merino-knit-sweater',
    description: 'Ultra-soft merino wool sweater in a relaxed fit.',
    material: '100% Merino Wool',
  },
  {
    id: '6', name: 'Pleated Midi Skirt', price: 175, originalPrice: 220, discount: 20,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    category: 'Skirts', rating: 4.5, reviews: 78, badge: 'sale',
    colors: ['#111111', '#D4AF37', '#808080'], sizes: ['XS', 'S', 'M', 'L'],
    inStock: true, slug: 'pleated-midi-skirt',
    description: 'Elegant pleated midi skirt with a fluid drape.',
    material: '100% Satin',
  },
  {
    id: '7', name: 'Tailored Coat', price: 595,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    category: 'Coats', rating: 4.9, reviews: 156, badge: 'bestseller',
    colors: ['#111111', '#808080', '#F5F5DC'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true, slug: 'tailored-coat',
    description: 'Impeccably tailored wool coat for a polished look.',
    material: '80% Wool, 20% Cashmere',
  },
  {
    id: '8', name: 'Silk Blouse', price: 165, originalPrice: 210, discount: 21,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
    category: 'Tops', rating: 4.7, reviews: 92, badge: 'limited',
    colors: ['#FFFFFF', '#D4AF37', '#111111'], sizes: ['XS', 'S', 'M', 'L'],
    inStock: false, slug: 'silk-blouse',
    description: 'Delicate silk blouse with a relaxed, luxurious feel.',
    material: '100% Silk',
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: '1', name: 'Summer Luxe', description: 'Effortless elegance for warm days',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
    slug: 'summer-luxe', itemCount: 24,
  },
  {
    id: '2', name: 'Autumn Edit', description: 'Rich textures and warm tones',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    slug: 'autumn-edit', itemCount: 18,
  },
  {
    id: '3', name: 'Evening Wear', description: 'Dress to impress, every occasion',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
    slug: 'evening-wear', itemCount: 15,
  },
  {
    id: '4', name: 'Workwear Essentials', description: 'Power dressing redefined',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    slug: 'workwear-essentials', itemCount: 30,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1', name: 'Sophia Laurent', location: 'Paris, France', rating: 5,
    comment: 'Veloura has completely transformed my wardrobe. The quality is unmatched and every piece feels like it was made just for me.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    date: 'October 2024',
  },
  {
    id: '2', name: 'Isabella Chen', location: 'New York, USA', rating: 5,
    comment: 'I\'ve shopped at many luxury boutiques, but Veloura stands apart. The curation is impeccable and the service is extraordinary.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    date: 'November 2024',
  },
  {
    id: '3', name: 'Amara Osei', location: 'London, UK', rating: 5,
    comment: 'Every order arrives beautifully packaged. The attention to detail is what sets Veloura apart from every other boutique.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
    date: 'December 2024',
  },
  {
    id: '4', name: 'Elena Rossi', location: 'Milan, Italy', rating: 5,
    comment: 'As someone who works in fashion, I have high standards. Veloura consistently exceeds them. Truly exceptional.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    date: 'January 2025',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1', title: 'The Art of Capsule Wardrobe Curation',
    excerpt: 'Discover how to build a timeless wardrobe with fewer, better pieces that work effortlessly together.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    author: 'Marie Dubois', date: 'January 15, 2025', category: 'Style Guide',
    slug: 'art-of-capsule-wardrobe', readTime: 5,
  },
  {
    id: '2', title: 'Spring/Summer 2025 Trend Report',
    excerpt: 'From fluid silhouettes to bold metallics — everything you need to know about this season\'s key trends.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    author: 'Claire Fontaine', date: 'January 22, 2025', category: 'Trends',
    slug: 'spring-summer-2025-trends', readTime: 7,
  },
  {
    id: '3', title: 'Sustainable Luxury: Fashion\'s New Frontier',
    excerpt: 'How the world\'s most prestigious brands are embracing sustainability without compromising on elegance.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    author: 'Sophie Martin', date: 'February 1, 2025', category: 'Sustainability',
    slug: 'sustainable-luxury-fashion', readTime: 6,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1', name: 'Isabelle Veloura', role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'With 15 years in luxury fashion, Isabelle founded Veloura to bring curated elegance to discerning women worldwide.',
  },
  {
    id: '2', name: 'Marcus Chen', role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Former designer at Dior and Valentino, Marcus brings an unparalleled eye for detail and craftsmanship.',
  },
  {
    id: '3', name: 'Amara Osei', role: 'Style Director',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    bio: 'Amara\'s global perspective and editorial background shape Veloura\'s distinctive aesthetic vision.',
  },
];

export const FAQS: FAQ[] = [
  {
    id: '1', category: 'Orders',
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days. Express delivery (1-2 business days) is available at checkout. International orders typically arrive within 7-14 business days.',
  },
  {
    id: '2', category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all unworn items with original tags attached. Simply initiate a return through your account dashboard and we\'ll arrange a complimentary collection.',
  },
  {
    id: '3', category: 'Sizing',
    question: 'How do I find my size?',
    answer: 'Each product page includes a detailed size guide. We recommend measuring yourself and comparing to our size chart. If you\'re between sizes, we generally recommend sizing up for a more relaxed fit.',
  },
  {
    id: '4', category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with 256-bit SSL encryption.',
  },
  {
    id: '5', category: 'Orders',
    question: 'Can I modify or cancel my order?',
    answer: 'Orders can be modified or cancelled within 1 hour of placement. After this window, the order enters our fulfilment process. Please contact our team immediately if you need assistance.',
  },
  {
    id: '6', category: 'Products',
    question: 'Are your products ethically sourced?',
    answer: 'Absolutely. We partner exclusively with certified ethical manufacturers and sustainable fabric suppliers. Every piece in our collection meets our strict standards for quality, craftsmanship, and ethical production.',
  },
];

export const CATEGORIES = ['All', 'Dresses', 'Blazers', 'Trousers', 'Bags', 'Knitwear', 'Skirts', 'Coats', 'Tops'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const COLORS = ['#111111', '#FFFFFF', '#D4AF37', '#808080', '#F5F5DC', '#D2B48C', '#8B4513'];
export const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated'];
