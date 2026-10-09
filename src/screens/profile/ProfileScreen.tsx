// ─── ProfileScreen — Luxury Design with Logout ───────────────────────────────

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';
import { AuthContext } from '../../context/AuthContext';
import { colors, spacing, borderRadius, shadows, typography } from '../../theme';

// ─── Profile menu items ────────────────────────────────────────────────────

const MENU_ITEMS = [
  {
    id: 'orders',
    icon: '📦',
    label: 'My Orders',
    subtitle: 'Track & manage orders',
  },
  {
    id: 'address',
    icon: '📍',
    label: 'Saved Addresses',
    subtitle: 'Manage shipping addresses',
  },
  {
    id: 'wishlist',
    icon: '🤍',
    label: 'Wishlist',
    subtitle: 'Saved items',
  },
  {
    id: 'coupons',
    icon: '🎟️',
    label: 'Coupons',
    subtitle: 'View discount codes',
  },
  {
    id: 'notifications',
    icon: '🔔',
    label: 'Notifications',
    subtitle: 'Alerts & offers',
  },
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    subtitle: 'App preferences',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const MenuItem = ({
  icon,
  label,
  subtitle,
  index,
  onPress,
}: {
  icon: string;
  label: string;
  subtitle: string;
  index: number;
  onPress?: () => void;
}) => (
  <Animated.View entering={FadeInUp.delay(100 + index * 50).duration(400)}>
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.menuIconWrapper}>
        <Text style={styles.menuIcon}>{icon}</Text>
      </View>
      <View style={styles.menuTextBlock}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.menuChevron}>›</Text>
    </TouchableOpacity>
  </Animated.View>
);

// ─── Logout Confirmation Modal ────────────────────────────────────────────────

const LogoutModal = ({
  visible,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    statusBarTranslucent
    onRequestClose={onCancel}
  >
    <Pressable style={styles.modalBackdrop} onPress={onCancel}>
      <Animated.View
        entering={ZoomIn.duration(250)}
        style={styles.modalCard}
      >
        {/* Icon */}
        <View style={styles.modalIconWrapper}>
          <Text style={styles.modalIcon}>👋</Text>
        </View>

        {/* Title */}
        <Text style={styles.modalTitle}>Logout</Text>

        {/* Message */}
        <Text style={styles.modalMessage}>
          Are you sure you want to logout from Femora?
        </Text>

        {/* Gold divider */}
        <View style={styles.modalDivider} />

        {/* Buttons */}
        <View style={styles.modalButtons}>
          {/* Cancel */}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutConfirmBtn}
            onPress={onConfirm}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutConfirmBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  </Modal>
);

// ─── Main ProfileScreen ───────────────────────────────────────────────────────

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutConfirm = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setShowLogoutModal(false);
    setTimeout(async () => {
      await logout();
      try {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (err) {
        // Safe fallback if navigation unmounts
      }
    }, 150);
  };

  const displayName = user?.name ?? 'Fashion User';
  const displayEmail = user?.email ?? 'user@femora.in';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F5F0" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={styles.headerSection}
        >
          <Text style={styles.screenTitle}>My Profile</Text>
        </Animated.View>

        {/* ── PROFILE CARD ────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(60).duration(500)}
          style={styles.profileCard}
        >
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
              }}
              style={styles.avatar}
              defaultSource={undefined}
            />
            {/* Fallback initials overlay if image fails */}
            <View style={styles.avatarInitialsFallback} pointerEvents="none">
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
            {/* Gold ring */}
            <View style={styles.avatarRing} />

            {/* Edit badge */}
            <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
              <Text style={styles.editBadgeText}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* Name & Email */}
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileEmail}>{displayEmail}</Text>

          {/* Femora member badge */}
          <View style={styles.memberBadge}>
            <Text style={styles.memberBadgeText}>✦ FEMORA LUXE MEMBER</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── MENU SECTION ────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(120).duration(500)}
          style={styles.menuSection}
        >
          <Text style={styles.menuSectionTitle}>Account</Text>
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                subtitle={item.subtitle}
                index={index}
                onPress={() => {
                  if (item.id === 'wishlist') {
                    navigation.navigate('Wishlist');
                  } else {
                    Alert.alert(item.label, `Viewing ${item.label} options.`);
                  }
                }}
              />
            ))}
          </View>
        </Animated.View>

        {/* ── LOGOUT BUTTON ───────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.logoutSection}
        >
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setShowLogoutModal(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Femora v2.0 · Luxury Fashion</Text>
        </Animated.View>
      </ScrollView>

      {/* ── LOGOUT CONFIRMATION MODAL ──────────────────────────────────── */}
      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </View>
  );
};

export default ProfileScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────

const GOLD = '#A88B5D';
const CREAM = '#F8F5F0';
const DARK = '#2D2D2D';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scrollContent: {
    paddingBottom: 100, // bottom tab bar clearance
  },

  // ── Header
  headerSection: {
    paddingTop: Platform.OS === 'ios' ? 60 : spacing.xl + 24,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    fontFamily: 'serif',
    color: DARK,
    letterSpacing: 0.3,
  },

  // ── Profile Card
  profileCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    padding: spacing.xxl,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: '#F0EAE0',
  },

  // Avatar
  avatarWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    resizeMode: 'cover',
  },
  avatarInitialsFallback: {
    ...StyleSheet.absoluteFill,
    borderRadius: 48,
    backgroundColor: '#E8DDD0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '800',
    color: GOLD,
    fontFamily: 'serif',
  },
  avatarRing: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 51,
    borderWidth: 2,
    borderColor: GOLD,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editBadgeText: {
    fontSize: 11,
  },

  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: DARK,
    fontFamily: 'serif',
    letterSpacing: 0.3,
    marginBottom: 4,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 13,
    color: '#888',
    fontWeight: '400',
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  memberBadge: {
    backgroundColor: '#FAF5EC',
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: '#E8D8B8',
    marginBottom: spacing.xl,
  },
  memberBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: GOLD,
    letterSpacing: 1.5,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0EAE0',
    paddingTop: spacing.lg,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: DARK,
    fontFamily: 'serif',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#F0EAE0',
  },

  // ── Menu Section
  menuSection: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  menuSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#AAA',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.soft,
    borderWidth: 1,
    borderColor: '#F0EAE0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F4EE',
    gap: spacing.md,
  },
  menuIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FAF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE3CE',
  },
  menuIcon: {
    fontSize: 16,
  },
  menuTextBlock: {
    flex: 1,
    gap: 2,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK,
    letterSpacing: 0.2,
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#AAA',
    fontWeight: '400',
  },
  menuChevron: {
    fontSize: 22,
    color: '#CCC',
    fontWeight: '300',
  },

  // ── Logout Button
  logoutSection: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: GOLD,
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: 20,
    ...shadows.soft,
  },
  logoutIcon: {
    fontSize: 18,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  versionText: {
    fontSize: 11,
    color: '#BBB',
    fontWeight: '400',
    letterSpacing: 0.3,
  },

  // ── Logout Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    ...shadows.lg,
  },
  modalIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FAF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#EEE3CE',
  },
  modalIcon: {
    fontSize: 28,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'serif',
    color: DARK,
    marginBottom: spacing.sm,
    letterSpacing: 0.3,
  },
  modalMessage: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: spacing.xl,
  },
  modalDivider: {
    width: 40,
    height: 2,
    backgroundColor: GOLD,
    borderRadius: 2,
    marginBottom: spacing.xl,
    opacity: 0.6,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: spacing.md + 2,
    borderRadius: 16,
    backgroundColor: '#F5F0EA',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DDD0',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.3,
  },
  logoutConfirmBtn: {
    flex: 1,
    paddingVertical: spacing.md + 2,
    borderRadius: 16,
    backgroundColor: GOLD,
    alignItems: 'center',
    ...shadows.soft,
  },
  logoutConfirmBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
