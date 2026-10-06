import type {
  AdminProduct, AdminOrder, AdminCustomer, AdminDiscount,
  AdminReview, AdminNotification, RevenueDataPoint, CategoryPerformance, AdminUser,
} from './types';

export const ADMIN_USER: AdminUser = {
  id: 'adm_1', name: 'Amara Osei', email: 'admin@giftcollection.com',
  role: 'super_admin', lastLogin: '2025-01-15T08:30:00Z',
  status: 'active', createdAt: '2024-01-01T00:00:00Z',
};

export const ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: '1', name: 'Silk Wrap Dress', slug: 'silk-wrap-dress', sku: 'GC-DRS-001',
    description: 'Luxurious silk wrap dress with a flattering silhouette.',
    shortDescription: 'Pure silk wrap dress', category: 'Dresses', collection: 'Summer Luxe',
    price: 285000, discountPrice: 213750, costPrice: 120000,
    stock: 12, lowStockThreshold: 5, reserved: 2,
    sizes: ['XS','S','M','L','XL'], colors: ['#111111','#D4AF37','#8B4513'],
    brand: 'Gift Collection', material: '100% Pure Silk',
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80'],
    featuredImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    tags: ['silk','dress','luxury'], status: 'active',
    rating: 4.8, reviews: 124, unitsSold: 89, revenue: 25365000,
    createdAt: '2024-10-01T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: '2', name: 'Cashmere Blazer', slug: 'cashmere-blazer', sku: 'GC-BLZ-001',
    description: 'Premium cashmere blazer for the modern woman.',
    shortDescription: 'Pure cashmere blazer', category: 'Blazers', collection: 'Workwear Essentials',
    price: 420000, costPrice: 180000,
    stock: 3, lowStockThreshold: 5, reserved: 1,
    sizes: ['XS','S','M','L'], colors: ['#111111','#F5F5DC','#808080'],
    brand: 'Gift Collection', material: '100% Cashmere',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80'],
    featuredImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    tags: ['cashmere','blazer','premium'], status: 'active',
    rating: 4.9, reviews: 89, unitsSold: 67, revenue: 28140000,
    createdAt: '2024-10-15T00:00:00Z', updatedAt: '2025-01-12T00:00:00Z',
  },
  {
    id: '3', name: 'Linen Wide-Leg Trousers', slug: 'linen-wide-leg-trousers', sku: 'GC-TRS-001',
    description: 'Effortlessly chic linen trousers with a wide-leg cut.',
    shortDescription: 'Pure linen wide-leg trousers', category: 'Trousers', collection: 'Summer Luxe',
    price: 195000, costPrice: 80000,
    stock: 18, lowStockThreshold: 5, reserved: 3,
    sizes: ['XS','S','M','L','XL'], colors: ['#F5F5DC','#111111','#D2B48C'],
    brand: 'Gift Collection', material: '100% Linen',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=600&q=80'],
    featuredImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=600&q=80',
    tags: ['linen','trousers','summer'], status: 'active',
    rating: 4.7, reviews: 67, unitsSold: 112, revenue: 21840000,
    createdAt: '2024-11-01T00:00:00Z', updatedAt: '2025-01-08T00:00:00Z',
  },
  {
    id: '4', name: 'Structured Leather Bag', slug: 'structured-leather-bag', sku: 'GC-BAG-001',
    description: 'Handcrafted Italian leather bag with gold hardware.',
    shortDescription: 'Full-grain Italian leather bag', category: 'Bags', collection: 'Premium Collection',
    price: 650000, discountPrice: 494000, costPrice: 280000,
    stock: 0, lowStockThreshold: 3, reserved: 0,
    sizes: ['One Size'], colors: ['#111111','#8B4513','#D4AF37'],
    brand: 'Gift Collection', material: 'Full-Grain Italian Leather',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'],
    featuredImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    tags: ['leather','bag','italian'], status: 'active',
    rating: 5.0, reviews: 203, unitsSold: 156, revenue: 101400000,
    createdAt: '2024-09-01T00:00:00Z', updatedAt: '2025-01-14T00:00:00Z',
  },
  {
    id: '5', name: 'Tailored Coat', slug: 'tailored-coat', sku: 'GC-COT-001',
    description: 'Impeccably tailored wool coat for a polished look.',
    shortDescription: 'Wool-cashmere tailored coat', category: 'Coats', collection: 'Autumn Edit',
    price: 595000, costPrice: 250000,
    stock: 7, lowStockThreshold: 5, reserved: 2,
    sizes: ['XS','S','M','L','XL'], colors: ['#111111','#808080','#F5F5DC'],
    brand: 'Gift Collection', material: '80% Wool, 20% Cashmere',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80'],
    featuredImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    tags: ['coat','wool','autumn'], status: 'active',
    rating: 4.9, reviews: 156, unitsSold: 78, revenue: 46410000,
    createdAt: '2024-09-15T00:00:00Z', updatedAt: '2025-01-11T00:00:00Z',
  },
  {
    id: '6', name: 'Silk Blouse', slug: 'silk-blouse', sku: 'GC-TOP-001',
    description: 'Delicate silk blouse with a relaxed, luxurious feel.',
    shortDescription: 'Pure silk relaxed blouse', category: 'Tops', collection: 'Summer Luxe',
    price: 165000, discountPrice: 130350, costPrice: 65000,
    stock: 2, lowStockThreshold: 5, reserved: 1,
    sizes: ['XS','S','M','L'], colors: ['#FFFFFF','#D4AF37','#111111'],
    brand: 'Gift Collection', material: '100% Silk',
    images: ['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80'],
    featuredImage: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    tags: ['silk','blouse','limited'], status: 'active',
    rating: 4.7, reviews: 92, unitsSold: 134, revenue: 22110000,
    createdAt: '2024-10-20T00:00:00Z', updatedAt: '2025-01-13T00:00:00Z',
  },
];

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ord_1', orderNumber: 'GC-2025-0041',
    customer: { id: 'cus_1', name: 'Sophia Laurent', email: 'sophia@example.com', phone: '+234 801 234 5678' },
    items: [{ productId: '1', name: 'Silk Wrap Dress', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&q=80', sku: 'GC-DRS-001', price: 285000, quantity: 1, size: 'M', color: '#111111' }],
    subtotal: 285000, discount: 0, shipping: 0, tax: 22800, total: 307800,
    paymentMethod: 'Paystack', paymentStatus: 'paid', orderStatus: 'delivered',
    shippingAddress: { address: '12 Victoria Island', city: 'Lagos', state: 'Lagos', zip: '101001', country: 'Nigeria' },
    timeline: [
      { status: 'Order Placed', date: '2025-01-10T09:00:00Z' },
      { status: 'Confirmed', date: '2025-01-10T09:30:00Z' },
      { status: 'Shipped', date: '2025-01-11T14:00:00Z' },
      { status: 'Delivered', date: '2025-01-13T11:00:00Z' },
    ],
    createdAt: '2025-01-10T09:00:00Z', updatedAt: '2025-01-13T11:00:00Z',
  },
  {
    id: 'ord_2', orderNumber: 'GC-2025-0042',
    customer: { id: 'cus_2', name: 'Isabella Chen', email: 'isabella@example.com', phone: '+234 802 345 6789' },
    items: [
      { productId: '2', name: 'Cashmere Blazer', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&q=80', sku: 'GC-BLZ-001', price: 420000, quantity: 1, size: 'S' },
      { productId: '3', name: 'Linen Wide-Leg Trousers', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=100&q=80', sku: 'GC-TRS-001', price: 195000, quantity: 1, size: 'S' },
    ],
    subtotal: 615000, discount: 61500, shipping: 3500, tax: 44280, total: 601280,
    paymentMethod: 'Flutterwave', paymentStatus: 'paid', orderStatus: 'shipped',
    shippingAddress: { address: '5 Banana Island', city: 'Lagos', state: 'Lagos', zip: '101001', country: 'Nigeria' },
    timeline: [
      { status: 'Order Placed', date: '2025-01-12T11:00:00Z' },
      { status: 'Confirmed', date: '2025-01-12T11:45:00Z' },
      { status: 'Shipped', date: '2025-01-13T16:00:00Z' },
    ],
    createdAt: '2025-01-12T11:00:00Z', updatedAt: '2025-01-13T16:00:00Z',
  },
  {
    id: 'ord_3', orderNumber: 'GC-2025-0043',
    customer: { id: 'cus_3', name: 'Amara Osei', email: 'amara@example.com', phone: '+234 803 456 7890' },
    items: [{ productId: '4', name: 'Structured Leather Bag', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80', sku: 'GC-BAG-001', price: 650000, quantity: 1 }],
    subtotal: 650000, discount: 0, shipping: 0, tax: 52000, total: 702000,
    paymentMethod: 'Bank Transfer', paymentStatus: 'pending', orderStatus: 'pending',
    shippingAddress: { address: '8 Ikoyi Crescent', city: 'Lagos', state: 'Lagos', zip: '101001', country: 'Nigeria' },
    timeline: [{ status: 'Order Placed', date: '2025-01-15T08:00:00Z' }],
    createdAt: '2025-01-15T08:00:00Z', updatedAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'ord_4', orderNumber: 'GC-2025-0044',
    customer: { id: 'cus_4', name: 'Elena Rossi', email: 'elena@example.com', phone: '+234 804 567 8901' },
    items: [{ productId: '5', name: 'Tailored Coat', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100&q=80', sku: 'GC-COT-001', price: 595000, quantity: 1, size: 'M' }],
    subtotal: 595000, discount: 59500, shipping: 0, tax: 42840, total: 578340,
    paymentMethod: 'Paystack', paymentStatus: 'paid', orderStatus: 'processing',
    shippingAddress: { address: '22 Lekki Phase 1', city: 'Lagos', state: 'Lagos', zip: '101001', country: 'Nigeria' },
    timeline: [
      { status: 'Order Placed', date: '2025-01-14T14:00:00Z' },
      { status: 'Confirmed', date: '2025-01-14T14:30:00Z' },
      { status: 'Processing', date: '2025-01-15T09:00:00Z' },
    ],
    createdAt: '2025-01-14T14:00:00Z', updatedAt: '2025-01-15T09:00:00Z',
  },
  {
    id: 'ord_5', orderNumber: 'GC-2025-0045',
    customer: { id: 'cus_5', name: 'Fatima Malik', email: 'fatima@example.com', phone: '+234 805 678 9012' },
    items: [{ productId: '6', name: 'Silk Blouse', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=100&q=80', sku: 'GC-TOP-001', price: 165000, quantity: 2, size: 'S' }],
    subtotal: 330000, discount: 0, shipping: 3500, tax: 26400, total: 359900,
    paymentMethod: 'Paystack', paymentStatus: 'failed', orderStatus: 'cancelled',
    shippingAddress: { address: '3 Abuja Way', city: 'Abuja', state: 'FCT', zip: '900001', country: 'Nigeria' },
    timeline: [
      { status: 'Order Placed', date: '2025-01-13T16:00:00Z' },
      { status: 'Cancelled', date: '2025-01-13T17:00:00Z', note: 'Payment failed' },
    ],
    createdAt: '2025-01-13T16:00:00Z', updatedAt: '2025-01-13T17:00:00Z',
  },
];

export const ADMIN_CUSTOMERS: AdminCustomer[] = [
  { id: 'cus_1', firstName: 'Sophia', lastName: 'Laurent', email: 'sophia@example.com', phone: '+234 801 234 5678', totalOrders: 8, totalSpent: 2460000, lastPurchase: '2025-01-10', status: 'active', createdAt: '2024-03-15T00:00:00Z' },
  { id: 'cus_2', firstName: 'Isabella', lastName: 'Chen', email: 'isabella@example.com', phone: '+234 802 345 6789', totalOrders: 5, totalSpent: 1850000, lastPurchase: '2025-01-12', status: 'active', createdAt: '2024-05-20T00:00:00Z' },
  { id: 'cus_3', firstName: 'Amara', lastName: 'Osei', email: 'amara@example.com', phone: '+234 803 456 7890', totalOrders: 12, totalSpent: 5200000, lastPurchase: '2025-01-15', status: 'active', createdAt: '2024-02-10T00:00:00Z' },
  { id: 'cus_4', firstName: 'Elena', lastName: 'Rossi', email: 'elena@example.com', phone: '+234 804 567 8901', totalOrders: 3, totalSpent: 980000, lastPurchase: '2025-01-14', status: 'active', createdAt: '2024-08-01T00:00:00Z' },
  { id: 'cus_5', firstName: 'Fatima', lastName: 'Malik', email: 'fatima@example.com', phone: '+234 805 678 9012', totalOrders: 1, totalSpent: 0, lastPurchase: '2025-01-13', status: 'inactive', createdAt: '2025-01-13T00:00:00Z' },
  { id: 'cus_6', firstName: 'Ngozi', lastName: 'Adeyemi', email: 'ngozi@example.com', phone: '+234 806 789 0123', totalOrders: 6, totalSpent: 3100000, lastPurchase: '2025-01-08', status: 'active', createdAt: '2024-04-12T00:00:00Z' },
];

export const ADMIN_DISCOUNTS: AdminDiscount[] = [
  { id: 'dis_1', code: 'GIFT10', type: 'percentage', value: 10, minOrderAmount: 0, usageLimit: 500, usageCount: 234, startDate: '2025-01-01', endDate: '2025-03-31', status: 'active', applicableTo: 'all', createdAt: '2024-12-28T00:00:00Z' },
  { id: 'dis_2', code: 'WELCOME', type: 'fixed', value: 5000, minOrderAmount: 50000, usageLimit: 1000, usageCount: 89, startDate: '2025-01-01', endDate: '2025-12-31', status: 'active', applicableTo: 'all', createdAt: '2024-12-28T00:00:00Z' },
  { id: 'dis_3', code: 'LUXE50', type: 'fixed', value: 10000, minOrderAmount: 200000, usageLimit: 200, usageCount: 45, startDate: '2025-01-01', endDate: '2025-06-30', status: 'active', applicableTo: 'all', createdAt: '2024-12-28T00:00:00Z' },
  { id: 'dis_4', code: 'GIFT20', type: 'percentage', value: 20, minOrderAmount: 100000, usageLimit: 100, usageCount: 100, startDate: '2024-12-01', endDate: '2024-12-31', status: 'expired', applicableTo: 'all', createdAt: '2024-11-28T00:00:00Z' },
];

export const ADMIN_REVIEWS: AdminReview[] = [
  { id: 'rev_1', customer: 'Sophia Laurent', customerId: 'cus_1', product: 'Silk Wrap Dress', productId: '1', rating: 5, comment: 'Absolutely stunning dress. The silk quality is exceptional and the fit is perfect.', status: 'approved', createdAt: '2025-01-11T10:00:00Z' },
  { id: 'rev_2', customer: 'Isabella Chen', customerId: 'cus_2', product: 'Cashmere Blazer', productId: '2', rating: 5, comment: 'Worth every naira. The cashmere is incredibly soft and the tailoring is impeccable.', status: 'approved', createdAt: '2025-01-13T14:00:00Z' },
  { id: 'rev_3', customer: 'Amara Osei', customerId: 'cus_3', product: 'Structured Leather Bag', productId: '4', rating: 4, comment: 'Beautiful bag, great quality. Delivery was a bit slow but worth the wait.', status: 'pending', createdAt: '2025-01-15T09:00:00Z' },
  { id: 'rev_4', customer: 'Elena Rossi', customerId: 'cus_4', product: 'Tailored Coat', productId: '5', rating: 5, comment: 'The most beautiful coat I have ever owned. Exceptional craftsmanship.', status: 'pending', createdAt: '2025-01-15T11:00:00Z' },
  { id: 'rev_5', customer: 'Ngozi Adeyemi', customerId: 'cus_6', product: 'Silk Blouse', productId: '6', rating: 2, comment: 'Not what I expected. The colour was different from the photos.', status: 'pending', createdAt: '2025-01-14T16:00:00Z' },
];

export const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: 'n1', type: 'order', title: 'New Order', message: 'Order GC-2025-0043 placed by Amara Osei — ₦702,000', read: false, createdAt: '2025-01-15T08:00:00Z', link: '/admin/orders' },
  { id: 'n2', type: 'stock', title: 'Low Stock Alert', message: 'Cashmere Blazer is running low (3 units remaining)', read: false, createdAt: '2025-01-15T07:00:00Z', link: '/admin/inventory' },
  { id: 'n3', type: 'stock', title: 'Out of Stock', message: 'Structured Leather Bag is now out of stock', read: false, createdAt: '2025-01-14T18:00:00Z', link: '/admin/inventory' },
  { id: 'n4', type: 'review', title: 'New Review', message: 'Amara Osei left a 4-star review on Structured Leather Bag', read: false, createdAt: '2025-01-15T09:00:00Z', link: '/admin/reviews' },
  { id: 'n5', type: 'payment', title: 'Payment Failed', message: 'Order GC-2025-0045 payment failed — ₦359,900', read: true, createdAt: '2025-01-13T17:00:00Z', link: '/admin/orders' },
  { id: 'n6', type: 'customer', title: 'New Customer', message: 'Fatima Malik just created an account', read: true, createdAt: '2025-01-13T16:00:00Z', link: '/admin/customers' },
];

export const REVENUE_DATA: RevenueDataPoint[] = [
  { date: 'Jan 1', revenue: 1850000, orders: 6, avgOrderValue: 308333 },
  { date: 'Jan 2', revenue: 2100000, orders: 7, avgOrderValue: 300000 },
  { date: 'Jan 3', revenue: 980000, orders: 3, avgOrderValue: 326667 },
  { date: 'Jan 4', revenue: 3200000, orders: 10, avgOrderValue: 320000 },
  { date: 'Jan 5', revenue: 2750000, orders: 9, avgOrderValue: 305556 },
  { date: 'Jan 6', revenue: 1600000, orders: 5, avgOrderValue: 320000 },
  { date: 'Jan 7', revenue: 4100000, orders: 13, avgOrderValue: 315385 },
  { date: 'Jan 8', revenue: 3500000, orders: 11, avgOrderValue: 318182 },
  { date: 'Jan 9', revenue: 2900000, orders: 9, avgOrderValue: 322222 },
  { date: 'Jan 10', revenue: 4800000, orders: 15, avgOrderValue: 320000 },
  { date: 'Jan 11', revenue: 3100000, orders: 10, avgOrderValue: 310000 },
  { date: 'Jan 12', revenue: 5200000, orders: 16, avgOrderValue: 325000 },
  { date: 'Jan 13', revenue: 2400000, orders: 8, avgOrderValue: 300000 },
  { date: 'Jan 14', revenue: 4600000, orders: 14, avgOrderValue: 328571 },
  { date: 'Jan 15', revenue: 3800000, orders: 12, avgOrderValue: 316667 },
];

export const CATEGORY_DATA: CategoryPerformance[] = [
  { category: 'Bags', revenue: 101400000, units: 156, percentage: 35 },
  { category: 'Coats', revenue: 46410000, units: 78, percentage: 16 },
  { category: 'Blazers', revenue: 28140000, units: 67, percentage: 10 },
  { category: 'Dresses', revenue: 25365000, units: 89, percentage: 9 },
  { category: 'Tops', revenue: 22110000, units: 134, percentage: 8 },
  { category: 'Trousers', revenue: 21840000, units: 112, percentage: 8 },
  { category: 'Others', revenue: 40735000, units: 204, percentage: 14 },
];

export const STAFF_MEMBERS: AdminUser[] = [
  { id: 'adm_1', name: 'Amara Osei', email: 'admin@giftcollection.com', role: 'super_admin', lastLogin: '2025-01-15T08:30:00Z', status: 'active', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'adm_2', name: 'Marcus Chen', email: 'marcus@giftcollection.com', role: 'manager', lastLogin: '2025-01-15T09:00:00Z', status: 'active', createdAt: '2024-03-01T00:00:00Z' },
  { id: 'adm_3', name: 'Sophie Martin', email: 'sophie@giftcollection.com', role: 'content', lastLogin: '2025-01-14T17:00:00Z', status: 'active', createdAt: '2024-06-01T00:00:00Z' },
  { id: 'adm_4', name: 'David Okafor', email: 'david@giftcollection.com', role: 'inventory', lastLogin: '2025-01-15T07:45:00Z', status: 'active', createdAt: '2024-07-15T00:00:00Z' },
  { id: 'adm_5', name: 'Chioma Eze', email: 'chioma@giftcollection.com', role: 'sales', lastLogin: '2025-01-13T16:00:00Z', status: 'inactive', createdAt: '2024-09-01T00:00:00Z' },
];
