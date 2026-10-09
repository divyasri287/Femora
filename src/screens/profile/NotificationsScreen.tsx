import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { spacing, borderRadius, shadows } from '../../theme';

const GOLD = '#A88B5D';
const CREAM = '#F8F5F0';
const DARK = '#2D2D2D';

// ─── Notification Data ────────────────────────────────────────────────────────

interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  message: string;
  time: string;
  category: 'order' | 'offer' | 'style' | 'system';
  read: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    icon: '📦',
    title: 'Order Shipped!',
    message: 'Your Ivory Silk Kurti is on its way. Expected delivery in 2 days.',
    time: '2 min ago',
    category: 'order',
    read: false,
  },
  {
    id: '2',
    icon: '🎟️',
    title: 'Exclusive Offer',
    message: 'Use code FEMORA20 for 20% off your next purchase. Valid for 48 hrs.',
    time: '1 hr ago',
    category: 'offer',
    read: false,
  },
  {
    id: '3',
    icon: '✨',
    title: 'New Arrivals',
    message: 'Fresh luxury styles just landed — Summer Collection 2026 is here.',
    time: '3 hrs ago',
    category: 'style',
    read: true,
  },
  {
    id: '4',
    icon: '📦',
    title: 'Order Delivered',
    message: 'Your Anarkali Silk Set has been delivered. We hope you love it! 🌸',
    time: 'Yesterday',
    category: 'order',
    read: true,
  },
  {
    id: '5',
    icon: '💛',
    title: 'Wishlist Price Drop',
    message: 'The Banarasi Saree you saved is now 15% off. Don\'t miss out!',
    time: '2 days ago',
    category: 'offer',
    read: true,
  },
  {
    id: '6',
    icon: '⚙️',
    title: 'Profile Updated',
    message: 'Your profile details have been successfully updated.',
    time: '3 days ago',
    category: 'system',
    read: true,
  },
];

const CATEGORY_COLORS: Record<NotificationItem['category'], string> = {
  order: '#4CAF50',
  offer: GOLD,
  style: '#9C27B0',
  system: '#607D8B',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const NotifCard = ({
  item,
  index,
  onPress,
}: {
  item: NotificationItem;
  index: number;
  onPress: (id: string) => void;
}) => (
  <Animated.View entering={FadeInDown.delay(60 + index * 50).duration(400)}>
    <TouchableOpacity
      style={[styles.notifCard, !item.read && styles.notifCardUnread]}
      onPress={() => onPress(item.id)}
      activeOpacity={0.8}
    >
      {/* Unread indicator */}
      {!item.read && (
        <View
          style={[styles.unreadDot, { backgroundColor: CATEGORY_COLORS[item.category] }]}
        />
      )}

      {/* Icon */}
      <View
        style={[
          styles.notifIconWrapper,
          { borderColor: CATEGORY_COLORS[item.category] + '44' },
        ]}
      >
        <Text style={styles.notifIcon}>{item.icon}</Text>
      </View>

      {/* Content */}
      <View style={styles.notifContent}>
        <View style={styles.notifHeader}>
          <Text style={[styles.notifTitle, !item.read && styles.notifTitleUnread]}>
            {item.title}
          </Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
        <Text style={styles.notifMessage} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  </Animated.View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const NotificationsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      {/* ── HEADER ── */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.screenTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badgeWrapper}>
              <Text style={styles.badge}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {unreadCount > 0 ? (
          <TouchableOpacity onPress={markAllRead} activeOpacity={0.7}>
            <Text style={styles.markAllText}>Mark all</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 55 }} />
        )}
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── EMPTY STATE ── */}
        {notifications.length === 0 ? (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySubtitle}>No new notifications right now.</Text>
          </Animated.View>
        ) : (
          <View style={styles.list}>
            {notifications.map((item, index) => (
              <NotifCard
                key={item.id}
                item={item}
                index={index}
                onPress={markAsRead}
              />
            ))}
          </View>
        )}

        {/* ── FOOTER ── */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.footer}>
          <View style={styles.goldDot} />
          <Text style={styles.footerText}>That's all your notifications</Text>
          <View style={styles.goldDot} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : spacing.xl + 24,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: CREAM,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EAE0',
    ...shadows.soft,
  },
  backIcon: {
    fontSize: 26,
    color: DARK,
    fontWeight: '300',
    lineHeight: 30,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'serif',
    color: DARK,
    letterSpacing: 0.3,
  },
  badgeWrapper: {
    backgroundColor: GOLD,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  markAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 0.3,
  },

  // List
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },

  // Notification card
  notifCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F0EAE0',
    alignItems: 'flex-start',
    gap: spacing.md,
    position: 'relative',
    ...shadows.soft,
  },
  notifCardUnread: {
    backgroundColor: '#FFFDF8',
    borderColor: '#EEE3CE',
  },
  unreadDot: {
    position: 'absolute',
    top: 14,
    left: 10,
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  notifIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FAF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 6,
  },
  notifIcon: {
    fontSize: 18,
  },
  notifContent: {
    flex: 1,
    gap: 4,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    flex: 1,
    letterSpacing: 0.1,
  },
  notifTitleUnread: {
    fontWeight: '800',
    color: DARK,
  },
  notifTime: {
    fontSize: 10,
    color: '#BBB',
    fontWeight: '400',
    marginTop: 1,
  },
  notifMessage: {
    fontSize: 12,
    color: '#AAA',
    lineHeight: 18,
    fontWeight: '400',
  },

  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
    gap: spacing.md,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'serif',
    color: DARK,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#AAA',
    fontWeight: '400',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxl,
  },
  footerText: {
    fontSize: 11,
    color: '#BBB',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  goldDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
    opacity: 0.5,
  },
});
