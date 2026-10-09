import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader, LuxuryButton } from '../../components/common';
import { useTheme, typography, spacing, borderRadius, shadows, colors } from '../../theme';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { trendingProducts, bestSellers } from '../../data/homeData';

const { width } = Dimensions.get('window');

const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS = [
  { name: 'Ivory', hex: '#FAF9F6' },
  { name: 'Luxe Gold', hex: '#B8945A' },
  { name: 'Blush Pink', hex: '#EED9C4' },
  { name: 'Emerald', hex: '#0B5345' },
  { name: 'Timeless Black', hex: '#1C1C1C' },
];

const MOCK_REVIEWS = [
  {
    id: 'r1',
    user: 'Aria M.',
    rating: 5,
    comment: 'The silk fabric is absolutely exquisite. Fits like a glove and feels extremely premium. Definitely worth the luxury price!',
    date: '3 days ago',
  },
  {
    id: 'r2',
    user: 'Nisha K.',
    rating: 4,
    comment: 'Beautiful design. The color is slightly more subtle than the photos but the drape is amazing. Got so many compliments.',
    date: '1 week ago',
  },
];

const DressDetailsScreen = ({ route, navigation }: any) => {
  const { item } = route.params;
  const { colors } = useTheme();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [imageIndex, setImageIndex] = useState(0);

  const isWishlisted = isInWishlist(item.id);

  // Generate 3 images for the carousel
  const productImages = [
    item.image,
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
  ];

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(item.id);
      Alert.alert('Wishlist', 'Item removed from your wishlist.');
    } else {
      addToWishlist(item);
      Alert.alert('Wishlist', 'Item added to your wishlist.');
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(item, selectedSize, selectedColor.name);
      Alert.alert('Added to Bag', `${item.name} has been added to your shopping bag.`);
    } catch (e) {
      Alert.alert('Error', 'Failed to add item to bag.');
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(item, selectedSize, selectedColor.name);
      navigation.navigate('Checkout');
    } catch (e) {
      Alert.alert('Error', 'Checkout initiation failed.');
    }
  };

  const handleScrollEnd = (event: any) => {
    const idx = Math.round(event.nativeEvent.contentOffset.x / width);
    setImageIndex(idx);
  };

  // Find similar products (excluding current one)
  const similarProducts = [...trendingProducts, ...bestSellers]
    .filter((p) => p.id !== item.id)
    .slice(0, 4);

  return (
    <ScreenContainer scrollable style={styles.noPadding}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── IMAGE CAROUSEL WITH SWIPER ── */}
      <View style={styles.carouselContainer}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={productImages}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={({ item: img }) => (
            <Image source={{ uri: img }} style={styles.carouselImage} />
          )}
        />

        {/* Carousel indicator dots */}
        <View style={styles.indicatorContainer}>
          {productImages.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.indicatorDot,
                { backgroundColor: idx === imageIndex ? colors.primary : 'rgba(255,255,255,0.4)' },
              ]}
            />
          ))}
        </View>

        {/* Back and Wishlist Header Overlays */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.headerCircleBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.headerBtnText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.headerCircleBtn, styles.headerCircleBtnRight]}
            onPress={toggleWishlist}
          >
            <Text style={[styles.headerBtnText, isWishlisted && styles.wishlisted]}>
              {isWishlisted ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── CONTENT DETAILS ── */}
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(500)}>
          <Text style={styles.brand}>{item.brand || 'Femora Luxe'}</Text>
          <Text style={[styles.name, { color: colors.textPrimary }]}>{item.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingStars}>{'★'.repeat(Math.round(item.rating))}</Text>
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {item.rating} ({item.reviewCount || 120} verified reviews)
            </Text>
          </View>

          {/* Pricing with Discount */}
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.textPrimary }]}>
              ₹{item.price.toLocaleString()}
            </Text>
            <Text style={[styles.originalPrice, { color: colors.textSecondary }]}>
              ₹{(item.originalPrice || Math.floor(item.price * 1.5)).toLocaleString()}
            </Text>
            <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.discountText}>{item.discount || 33}% OFF</Text>
            </View>
          </View>
        </Animated.View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Color Selector */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Select Color: <Text style={styles.selectedLabel}>{selectedColor.name}</Text>
        </Text>
        <View style={styles.colorContainer}>
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c.name}
              style={[
                styles.colorCircleWrapper,
                selectedColor.name === c.name && { borderColor: colors.primary },
              ]}
              onPress={() => setSelectedColor(c)}
            >
              <View style={[styles.colorCircle, { backgroundColor: c.hex }]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Size Selector */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {SIZES.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                { borderColor: colors.border },
                selectedSize === size && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  { color: selectedSize === size ? colors.white : colors.textPrimary },
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Description */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Description</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Indulge in pure elegance with our signature couture edit. Crafted from the finest heavyweight organic silk, this dress features drape detailing, a wrap silhouette, and delicate stitching. Tailored for absolute comfort and luxury. Perfect for evening parties, reception functions, or luxury lounge edits.
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Customer Reviews */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Verified Reviews</Text>
        {MOCK_REVIEWS.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={[styles.reviewUser, { color: colors.textPrimary }]}>
                {review.user}
              </Text>
              <Text style={styles.reviewStars}>{'★'.repeat(review.rating)}</Text>
            </View>
            <Text style={[styles.reviewComment, { color: colors.textSecondary }]}>
              {review.comment}
            </Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        ))}

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Similar Products */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Similar Couture Picks
        </Text>
        <FlatList
          horizontal
          data={similarProducts}
          keyExtractor={(item) => 'similar-' + item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.similarList}
          renderItem={({ item: p, index }) => (
            <TouchableOpacity
              onPress={() => navigation.push('DressDetails', { item: p })}
              activeOpacity={0.9}
              style={styles.similarItem}
            >
              <Image source={{ uri: p.image }} style={styles.similarImage} />
              <Text style={styles.similarBrand}>{p.brand}</Text>
              <Text style={[styles.similarName, { color: colors.textPrimary }]} numberOfLines={1}>
                {p.name}
              </Text>
              <Text style={[styles.similarPrice, { color: colors.primary }]}>
                ₹{p.price.toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Primary Checkout Actions */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.actionButtons}>
          <LuxuryButton
            title="Add To Bag"
            onPress={handleAddToCart}
            style={styles.buttonSpacing}
            variant="outline"
          />
          <LuxuryButton title="Buy Now" onPress={handleBuyNow} style={styles.buttonSpacing} />
        </Animated.View>
      </View>
    </ScreenContainer>
  );
};

export default DressDetailsScreen;

const styles = StyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
  },
  carouselContainer: {
    width: width,
    height: 480,
    position: 'relative',
    backgroundColor: '#F0EBE3',
  },
  carouselImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  headerOverlay: {
    position: 'absolute',
    top: 50,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  headerCircleBtnRight: {
    alignSelf: 'flex-end',
  },
  headerBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
  },
  wishlisted: {
    color: '#E05252',
  },
  content: {
    padding: spacing.lg,
    backgroundColor: '#F8F5F0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  brand: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'serif',
    lineHeight: 28,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.md,
  },
  ratingStars: {
    fontSize: 12,
    color: '#F5A623',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  originalPrice: {
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'serif',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  selectedLabel: {
    fontWeight: 'normal',
    color: '#888',
    fontFamily: 'sans-serif',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  colorCircleWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  sizeButton: {
    borderWidth: 1,
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    backgroundColor: '#FFFFFF',
    ...shadows.soft,
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.md,
  },

  // Reviews
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewUser: {
    fontSize: 13,
    fontWeight: '700',
  },
  reviewStars: {
    fontSize: 10,
    color: '#F5A623',
  },
  reviewComment: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 10,
    color: '#AAA',
  },

  // Similar products
  similarList: {
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  similarItem: {
    width: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  similarImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 6,
    resizeMode: 'cover',
  },
  similarBrand: {
    fontSize: 8,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  similarName: {
    fontSize: 11,
    fontWeight: '700',
    marginVertical: 1,
  },
  similarPrice: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'serif',
  },

  actionButtons: {
    marginTop: spacing.xl,
    paddingBottom: 40,
  },
  buttonSpacing: {
    marginBottom: spacing.md,
  },
});