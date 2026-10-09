import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader, EmptyState } from '../../components/common';
import { useTheme, typography, spacing, borderRadius, shadows } from '../../theme';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - spacing.lg * 2 - spacing.md) / 2;

const WishlistScreen = ({ navigation }: any) => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { colors } = useTheme();

  const handleMoveToCart = async (item: any) => {
    try {
      // Add to shopping bag
      await addToCart(item, 'M', 'Default');
      // Remove from wishlist
      await removeFromWishlist(item.id);
      Alert.alert('Moved to Bag', `${item.name} has been moved to your shopping bag.`);
    } catch (e) {
      Alert.alert('Error', 'Could not move item to bag.');
    }
  };

  const handleRemove = async (id: string) => {
    await removeFromWishlist(id);
    Alert.alert('Wishlist', 'Item removed from your wishlist.');
  };

  if (wishlist.length === 0) {
    return (
      <EmptyState
        emoji="🤍"
        title="Your Wishlist is Empty"
        message="Keep track of the couture you love. Save items here, and move them to your bag when you're ready."
        buttonText="Explore Products"
        onButtonPress={() => navigation.navigate('Home')}
      />
    );
  }

  return (
    <ScreenContainer style={styles.noPadding}>
      <StatusBar barStyle="dark-content" />
      <LuxuryHeader title="My Wishlist" />

      <FlatList
        data={wishlist}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.delay(index * 80).duration(400)}
            style={styles.card}
          >
            {/* Image Container */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              {/* Delete button icon overlay */}
              <TouchableOpacity
                style={styles.deleteOverlayBtn}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.deleteIconText}>✕</Text>
              </TouchableOpacity>

              {item.discount && (
                <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.discountText}>{item.discount}% OFF</Text>
                </View>
              )}
            </View>

            {/* Content Details */}
            <View style={styles.content}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.price, { color: colors.textPrimary }]}>
                ₹{item.price.toLocaleString()}
              </Text>
            </View>

            {/* Move to Cart button */}
            <TouchableOpacity
              style={[styles.moveBtn, { backgroundColor: colors.primary }]}
              onPress={() => handleMoveToCart(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.moveBtnText}>Move to Bag</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </ScreenContainer>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 110, // clear tab navigation height
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  imageContainer: {
    width: '100%',
    height: 190,
    position: 'relative',
    backgroundColor: '#F0EBE3',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteOverlayBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  content: {
    padding: spacing.md,
    gap: 2,
  },
  brand: {
    fontSize: 8,
    fontWeight: '600',
    color: '#B08D57',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'serif',
  },
  price: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'serif',
    marginTop: 2,
  },
  moveBtn: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
  },
  moveBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },
});
