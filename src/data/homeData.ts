// ─── Home Screen Data ────────────────────────────────────────────────────────

export const heroBanners = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop',
    tag: 'SUMMER 2024',
    title: 'Summer\nCollection',
    subtitle: 'Light fabrics, bold confidence',
    cta: 'Shop Now',
    accent: '#A68A64',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
    tag: 'BRIDAL EDIT',
    title: 'Wedding\nCollection',
    subtitle: 'Your day, your story, your gown',
    cta: 'Explore',
    accent: '#C8B08A',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=900&auto=format&fit=crop',
    tag: 'LUXURY EDIT',
    title: 'Luxury\nCollection',
    subtitle: 'Couture crafted for the discerning woman',
    cta: 'Discover',
    accent: '#A68A64',
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1515347619362-74944d6db598?q=80&w=900&auto=format&fit=crop',
    tag: 'JUST LANDED',
    title: 'New\nArrivals',
    subtitle: 'Fresh silhouettes, timeless elegance',
    cta: 'View All',
    accent: '#C8B08A',
  },
];

export const luxuryCategories = [
  { id: '1', icon: '👗', label: 'Dresses' },
  { id: '2', icon: '👜', label: 'Bags' },
  { id: '3', icon: '👠', label: 'Heels' },
  { id: '4', icon: '💎', label: 'Jewellery' },
  { id: '5', icon: '🌸', label: 'Ethnic' },
  { id: '6', icon: '🔥', label: 'Trending' },
];

export interface LuxuryProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  freeDelivery: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const trendingProducts: LuxuryProduct[] = [
  {
    id: 't1',
    name: 'Ivory Silk Wrap Dress',
    brand: 'Femora Luxe',
    image:
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop',
    price: 3499,
    originalPrice: 5499,
    discount: 36,
    rating: 4.9,
    reviewCount: 312,
    freeDelivery: true,
    isNew: true,
  },
  {
    id: 't2',
    name: 'Blush Floral Maxi',
    brand: 'Femora Couture',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop',
    price: 2799,
    originalPrice: 4199,
    discount: 33,
    rating: 4.8,
    reviewCount: 248,
    freeDelivery: true,
  },
  {
    id: 't3',
    name: 'Cobalt Pleated Gown',
    brand: 'Femora Edit',
    image:
      'https://images.unsplash.com/photo-1515347619362-74944d6db598?q=80&w=400&auto=format&fit=crop',
    price: 4199,
    originalPrice: 6499,
    discount: 35,
    rating: 4.7,
    reviewCount: 189,
    freeDelivery: true,
    isBestSeller: true,
  },
  {
    id: 't4',
    name: 'Emerald Evening Dress',
    brand: 'Femora Luxe',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
    price: 5299,
    originalPrice: 7999,
    discount: 34,
    rating: 4.9,
    reviewCount: 421,
    freeDelivery: true,
    isBestSeller: true,
  },
];

export const luxuryCollectionProducts: LuxuryProduct[] = [
  {
    id: 'l1',
    name: 'Pearl Embellished Lehenga',
    brand: 'Femora Heritage',
    image:
      'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=600&auto=format&fit=crop',
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    rating: 5.0,
    reviewCount: 87,
    freeDelivery: true,
  },
  {
    id: 'l2',
    name: 'Gold Zari Saree',
    brand: 'Femora Heritage',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    price: 9499,
    originalPrice: 14999,
    discount: 37,
    rating: 4.9,
    reviewCount: 156,
    freeDelivery: true,
  },
];

export const recommendedProducts: LuxuryProduct[] = [
  {
    id: 'r1',
    name: 'Rose Lace Co-ord Set',
    brand: 'Femora Luxe',
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop',
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    rating: 4.8,
    reviewCount: 203,
    freeDelivery: true,
    isNew: true,
  },
  {
    id: 'r2',
    name: 'Vintage Floral Midi',
    brand: 'Femora Edit',
    image:
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=400&auto=format&fit=crop',
    price: 1999,
    originalPrice: 3199,
    discount: 38,
    rating: 4.7,
    reviewCount: 174,
    freeDelivery: false,
  },
  {
    id: 'r3',
    name: 'Champagne Sequin Gown',
    brand: 'Femora Couture',
    image:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&auto=format&fit=crop',
    price: 6799,
    originalPrice: 9999,
    discount: 32,
    rating: 4.9,
    reviewCount: 98,
    freeDelivery: true,
    isBestSeller: true,
  },
  {
    id: 'r4',
    name: 'Dusty Sage Kurta Set',
    brand: 'Femora Ethnic',
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
    price: 1799,
    originalPrice: 2799,
    discount: 36,
    rating: 4.6,
    reviewCount: 267,
    freeDelivery: true,
  },
];

export const weddingBanners = [
  {
    id: 'w1',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700&auto=format&fit=crop',
    title: 'Bridal Lehengas',
    subtitle: 'From ₹8,999',
  },
  {
    id: 'w2',
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=700&auto=format&fit=crop',
    title: 'Reception Gowns',
    subtitle: 'From ₹5,499',
  },
];

export const bestSellers: LuxuryProduct[] = [
  {
    id: 'b1',
    name: 'Timeless Black Gown',
    brand: 'Femora Luxe',
    image:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&auto=format&fit=crop',
    price: 4599,
    originalPrice: 6999,
    discount: 34,
    rating: 4.9,
    reviewCount: 512,
    freeDelivery: true,
    isBestSeller: true,
  },
  {
    id: 'b2',
    name: 'Terracotta Anarkali',
    brand: 'Femora Ethnic',
    image:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop',
    price: 2499,
    originalPrice: 3799,
    discount: 34,
    rating: 4.8,
    reviewCount: 387,
    freeDelivery: true,
    isBestSeller: true,
  },
  {
    id: 'b3',
    name: 'Ivory Bridal Sharara',
    brand: 'Femora Heritage',
    image:
      'https://images.unsplash.com/photo-1582896911227-c966e6e42b49?q=80&w=400&auto=format&fit=crop',
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    rating: 5.0,
    reviewCount: 231,
    freeDelivery: true,
    isBestSeller: true,
  },
  {
    id: 'b4',
    name: 'Powder Pink Saree',
    brand: 'Femora Couture',
    image:
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop',
    price: 3299,
    originalPrice: 4999,
    discount: 34,
    rating: 4.7,
    reviewCount: 445,
    freeDelivery: true,
    isBestSeller: true,
  },
];
