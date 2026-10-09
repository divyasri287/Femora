import React, { createContext, useState, useEffect } from 'react';
import { getData, saveData } from '../utils/storage';

export interface NotificationItem {
  id: string;
  type: 'offer' | 'pricedrop' | 'wishlist' | 'order' | 'festival';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsContextType {
  notifications: NotificationItem[];
  addNotification: (
    type: NotificationItem['type'],
    title: string,
    message: string
  ) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
}

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  addNotification: async () => {},
  markAsRead: async () => {},
  clearAllNotifications: async () => {},
});

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'festival',
    title: '✨ Festive Grand Sale',
    message: 'Enjoy up to 40% off on the Couture collection. Use code FESTIVE40 at checkout.',
    date: 'Today, 10:00 AM',
    read: false,
  },
  {
    id: 'n2',
    type: 'pricedrop',
    title: '📉 Price Drop Alert',
    message: 'Ivory Silk Wrap Dress in your wishlist is now ₹3,499 (was ₹5,499). Grab it now!',
    date: 'Yesterday, 4:30 PM',
    read: false,
  },
  {
    id: 'n3',
    type: 'offer',
    title: '🚚 Free Shipping Weekend',
    message: 'Complimentary express delivery on all premium orders. No code required.',
    date: '2 days ago',
    read: true,
  },
];

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const stored = await getData('notifications');
      if (stored) {
        setNotifications(stored);
      } else {
        setNotifications(DEFAULT_NOTIFICATIONS);
        await saveData('notifications', DEFAULT_NOTIFICATIONS);
      }
    };
    loadNotifications();
  }, []);

  const addNotification = async (
    type: NotificationItem['type'],
    title: string,
    message: string
  ) => {
    const newItem: NotificationItem = {
      id: 'NOT-' + Math.floor(100000 + Math.random() * 900000),
      type,
      title,
      message,
      date: 'Just now',
      read: false,
    };
    const updated = [newItem, ...notifications];
    setNotifications(updated);
    await saveData('notifications', updated);
  };

  const markAsRead = async (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    await saveData('notifications', updated);
  };

  const clearAllNotifications = async () => {
    setNotifications([]);
    await saveData('notifications', []);
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, markAsRead, clearAllNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
