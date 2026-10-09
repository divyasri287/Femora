import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { typography, spacing, borderRadius, shadows } from '../../theme';

interface ProductItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  rating?: number;
}

interface Props {
  item: ProductItem;
  onPress: () => void;
}

export const LuxuryProductCard = ({ item, onPress }: Props) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.cardBackground },
        !isDarkMode && shadows.soft,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={[styles.wishlistButton, { backgroundColor: colors.cardBackground }]}>
          <Text style={{ color: colors.textPrimary, fontSize: 16, marginTop: 2 }}>♡</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} style={[styles.name, { color: colors.textPrimary }]}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.primary }]}>₹{item.price}</Text>
          {item.rating && <Text style={[styles.rating, { color: colors.textSecondary }]}>⭐ {item.rating}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderRadius: borderRadius.medium,
    marginRight: spacing.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    ...typography.bodyMedium,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...typography.heading3,
  },
  rating: {
    ...typography.caption,
    fontWeight: '600',
  },
});
