import React, { createContext, useState, useEffect } from 'react';
import { getData, saveData } from '../utils/storage';

export interface CartItem {
  cartItemId: string; // unique identifier in cart
  id: string; // product id
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  discount: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: any,
    size: string,
    color: string,
    quantity?: number
  ) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const stored = await getData('cart');
      if (stored) {
        setCart(stored);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (
    product: any,
    size: string,
    color: string,
    quantity: number = 1
  ) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    const existingIndex = cart.findIndex((item) => item.cartItemId === cartItemId);

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        cartItemId,
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        quantity,
        selectedSize: size,
        selectedColor: color,
        discount: product.discount || 0,
      });
    }

    setCart(updatedCart);
    await saveData('cart', updatedCart);
  };

  const removeFromCart = async (cartItemId: string) => {
    const updatedCart = cart.filter((item) => item.cartItemId !== cartItemId);
    setCart(updatedCart);
    await saveData('cart', updatedCart);
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    await saveData('cart', updatedCart);
  };

  const clearCart = async () => {
    setCart([]);
    await saveData('cart', []);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};