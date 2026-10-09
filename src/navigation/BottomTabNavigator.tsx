import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import CollectionsScreen from '../screens/home/CollectionsScreen';
import AIStylistScreen from '../screens/ai/AIStylistScreen';
import WishlistScreen from '../screens/wishlist/WishlistScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

const Tab = createBottomTabNavigator();

// ─── Tab icon definitions ───
const TAB_ICONS: Record<string, { icon: string; label: string }> = {
  Home:        { icon: '🏠', label: 'Home' },
  Explore:     { icon: '🧭', label: 'Explore' },
  AIStylist:   { icon: '✨', label: 'AI Stylist' },
  Wishlist:    { icon: '🤍', label: 'Wishlist' },
  Profile:     { icon: '👤', label: 'Profile' },
};

const TabBarIcon = ({
  focused,
  routeName,
}: {
  focused: boolean;
  routeName: string;
}) => {
  const { icon, label } = TAB_ICONS[routeName] ?? { icon: '●', label: routeName };
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Text style={[styles.iconEmoji, focused && styles.iconEmojiFocused]}>
        {icon}
      </Text>
      <Text style={[styles.iconLabel, focused && styles.iconLabelFocused]}>
        {label}
      </Text>
      {focused && <View style={styles.activeDot} />}
    </View>
  );
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} routeName={route.name} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={CollectionsScreen} />
      <Tab.Screen name="AIStylist" component={AIStylistScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    height: 70,
    backgroundColor: '#FFFFFF', // Premium White
    borderRadius: 35,
    borderTopWidth: 0,
    ...shadows.lg,
    paddingHorizontal: spacing.md,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#EAE4DC', // Beige border
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minWidth: 48,
    gap: 2,
    position: 'relative',
  },
  iconContainerFocused: {},
  iconEmoji: {
    fontSize: 18,
    opacity: 0.45,
  },
  iconEmojiFocused: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  iconLabel: {
    ...typography.caption,
    fontSize: 9,
    color: '#888888',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  iconLabelFocused: {
    color: '#B08D57', // Luxury active gold text
    fontWeight: '700',
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#B08D57', // Active gold dot
  },
});