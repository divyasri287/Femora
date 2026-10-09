import React, { createContext, useState, useEffect } from 'react';
import { getData, saveData } from '../utils/storage';

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  address: string;
  deliveryMethod: string;
  paymentMethod: string;
  total: number;
  date: string;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out For Delivery' | 'Delivered';
}

interface OrdersContextType {
  orders: Order[];
  placeOrder: (
    items: OrderItem[],
    address: string,
    deliveryMethod: string,
    paymentMethod: string,
    total: number
  ) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

export const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  placeOrder: async () => ({} as Order),
  updateOrderStatus: async () => {},
});

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const storedOrders = await getData('orders');
      if (storedOrders) {
        setOrders(storedOrders);
      }
    };
    loadOrders();
  }, []);

  const placeOrder = async (
    items: OrderItem[],
    address: string,
    deliveryMethod: string,
    paymentMethod: string,
    total: number
  ): Promise<Order> => {
    const newOrder: Order = {
      id: 'FEM-' + Math.floor(100000 + Math.random() * 900000),
      items,
      address,
      deliveryMethod,
      paymentMethod,
      total,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed',
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    await saveData('orders', updatedOrders);
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    );
    setOrders(updatedOrders);
    await saveData('orders', updatedOrders);
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};
