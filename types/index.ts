export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  hoverImage?: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: 'new' | 'sale' | 'bestseller' | 'limited';
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  description?: string;
  material?: string;
  slug: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  itemCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  slug: string;
  readTime: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
