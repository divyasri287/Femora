import React, { createContext, useState, useEffect } from 'react';
import { getData, saveData } from '../utils/storage';

export interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: any) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isInWishlist: () => false,
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const stored = await getData('wishlist');
      if (stored) {
        setWishlist(stored);
      }
    };
    loadWishlist();
  }, []);

  const addToWishlist = async (product: any) => {
    if (wishlist.some((item) => item.id === product.id)) return;
    const updated = [
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
        reviewCount: product.reviewCount,
      },
      ...wishlist,
    ];
    setWishlist(updated);
    await saveData('wishlist', updated);
  };

  const removeFromWishlist = async (productId: string) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    await saveData('wishlist', updated);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};