// ─── Admin User / Auth ────────────────────────────────────────────────────────
export type AdminRole = 'super_admin' | 'admin' | 'manager' | 'sales' | 'inventory' | 'content';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface AdminPermissions {
  products: boolean;
  orders: boolean;
  customers: boolean;
  inventory: boolean;
  analytics: boolean;
  marketing: boolean;
  content: boolean;
  settings: boolean;
  staff: boolean;
  discounts: boolean;
  reviews: boolean;
}

// ─── Product (Admin extended) ─────────────────────────────────────────────────
export type ProductStatus = 'active' | 'draft' | 'archived';

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription: string;
  category: string;
  collection: string;
  price: number;
  discountPrice?: number;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  reserved: number;
  sizes: string[];
  colors: string[];
  brand: string;
  material: string;
  images: string[];
  featuredImage: string;
  tags: string[];
  status: ProductStatus;
  rating: number;
  reviews: number;
  unitsSold: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface AdminOrderItem {
  productId: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: { id: string; name: string; email: string; phone: string };
  items: AdminOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: {
    address: string; city: string; state: string; zip: string; country: string;
  };
  notes?: string;
  timeline: { status: string; date: string; note?: string }[];
  createdAt: string;
  updatedAt: string;
}

// ─── Customer ─────────────────────────────────────────────────────────────────
export interface AdminCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchase: string;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
  notes?: string;
}

// ─── Discount ─────────────────────────────────────────────────────────────────
export type DiscountType = 'percentage' | 'fixed';

export interface AdminDiscount {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrderAmount: number;
  usageLimit: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  applicableTo: 'all' | 'category' | 'product';
  createdAt: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────
export interface AdminReview {
  id: string;
  customer: string;
  customerId: string;
  product: string;
  productId: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// ─── Notification ─────────────────────────────────────────────────────────────
export interface AdminNotification {
  id: string;
  type: 'order' | 'stock' | 'customer' | 'review' | 'payment' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
}

export interface CategoryPerformance {
  category: string;
  revenue: number;
  units: number;
  percentage: number;
}
