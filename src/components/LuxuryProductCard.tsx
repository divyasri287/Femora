import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows } from '../theme';
import { LuxuryProduct } from '../data/homeData';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.46;

interface LuxuryProductCardProps {
  item: LuxuryProduct;
  index?: number;
  onPress?: () => void;
  onWishlist?: () => void;
  style?: object;
}

const LuxuryProductCard = ({
  item,
  index = 0,
  onPress,
  onWishlist,
  style,
}: LuxuryProductCardProps) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const isWishlisted = isInWishlist(item.id);
  const scale = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(item.id);
      Alert.alert('Wishlist', 'Item removed from your wishlist.');
    } else {
      addToWishlist(item);
      Alert.alert('Wishlist', 'Item added to your wishlist.');
    }
    onWishlist?.();
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(item, 'M', 'Default');
      Alert.alert('Added to Bag', `${item.name} has been added to your shopping bag.`);
    } catch (e) {
      Alert.alert('Error', 'Failed to add item to bag.');
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80).duration(500)}
      style={[animatedCardStyle, styles.wrapper, style]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* Discount Badge */}
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>

          {/* Label Badge */}
          {(item.isNew || item.isBestSeller) && (
            <View style={styles.labelBadge}>
              <Text style={styles.labelText}>
                {item.isNew ? '✦ NEW' : '⭐ BESTSELLER'}
              </Text>
            </View>
          )}

          {/* Wishlist Button */}
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={toggleWishlist}
            activeOpacity={0.8}
          >
            <Text style={[styles.wishlistIcon, isWishlisted && styles.wishlisted]}>
              {isWishlisted ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingStars}>{'★'.repeat(Math.round(item.rating))}</Text>
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviewCount})
            </Text>
          </View>

          {/* Price & Cart row */}
          <View style={styles.priceCartRow}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
              <Text style={styles.originalPrice}>
                ₹{item.originalPrice.toLocaleString()}
              </Text>
            </View>

            {/* Quick Add Button */}
            <TouchableOpacity
              style={styles.cartButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Text style={styles.cartButtonText}>+👜</Text>
            </TouchableOpacity>
          </View>

          {/* Free Delivery Badge */}
          {item.freeDelivery && (
            <View style={styles.deliveryBadge}>
              <Text style={styles.deliveryText}>🚚 FREE Delivery</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LuxuryProductCard;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.soft,
  },
  imageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#F0EBE3',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  labelBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  labelText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#F8F5F0',
    letterSpacing: 0.8,
  },
  wishlistButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  wishlistIcon: {
    fontSize: 18,
    color: '#888',
    lineHeight: 20,
  },
  wishlisted: {
    color: '#E05252',
  },
  content: {
    padding: spacing.md,
    gap: 4,
  },
  brand: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'serif',
    lineHeight: 18,
    height: 36, // Force two line alignment
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingStars: {
    fontSize: 10,
    color: '#F5A623',
  },
  ratingText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  priceCartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'column',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: 'serif',
  },
  originalPrice: {
    fontSize: 11,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  cartButtonText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '700',
  },
  deliveryBadge: {
    marginTop: 4,
  },
  deliveryText: {
    fontSize: 10,
    color: '#5E8C61',
    fontWeight: '700',
  },
});
