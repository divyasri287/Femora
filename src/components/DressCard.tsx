import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { Dress } from '../types';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

interface Props {
  item: Dress;
  onPress: () => void;
}

const DressCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>20% OFF</Text>
        </View>
        <TouchableOpacity style={styles.wishlistButton}>
          <Text style={styles.wishlistIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DressCard;

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
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
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  wishlistButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  wishlistIcon: {
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 2,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...typography.subHeading,
    color: colors.primary,
  },
  rating: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});