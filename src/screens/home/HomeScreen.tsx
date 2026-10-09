// ─── HomeScreen — Phase 2: Premium Luxury Redesign ───────────────────────────
// Cream background luxury fashion app home screen.

import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
} from 'react-native-reanimated';

// Components
import LuxuryBanner from '../../components/LuxuryBanner';
import LuxuryProductCard from '../../components/LuxuryProductCard';
import LuxurySectionHeader from '../../components/LuxurySectionHeader';

// Context
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

// Data
import {
  luxuryCategories,
  trendingProducts,
  luxuryCollectionProducts,
  recommendedProducts,
  weddingBanners,
  bestSellers,
} from '../../data/homeData';

// Theme
import { colors, spacing, borderRadius, shadows } from '../../theme';

const { width } = Dimensions.get('window');

// ─── Offers List for Sliding Header ───
const OFFERS = [
  '✨ USE CODE FEMORA20 TO GET FLAT 20% OFF ON YOUR FIRST ORDER',
  '🚚 COMPLIMENTARY EXPRESS DELIVERY ON ALL ORDERS ABOVE ₹4,999',
  '💎 NEW ARRIVALS: COUTURE BRIDAL COLLECTION IS NOW LIVE',
  '🔄 HASSLE-FREE 14-DAY RETURNS & PICKUPS FOR LUXURY CLIENTS',
];

// ─── Top Brands ───
const BRANDS = [
  { name: 'Gucci', logo: '⚜️' },
  { name: 'Chanel', logo: '💎' },
  { name: 'Prada', logo: '✨' },
  { name: 'Dior', logo: '✦' },
  { name: 'Femora Heritage', logo: '👑' },
  { name: 'Femora Luxe', logo: '🎗️' },
];

const HomeScreen = ({ navigation }: any) => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [activeCategory, setActiveCategory] = useState('1');
  const [offerIndex, setOfferIndex] = useState(0);

  // Recently Viewed state - initialize with default items
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>(bestSellers.slice(0, 3));

  // Flash Sale Countdown state (2h 14m 30s)
  const [timeLeft, setTimeLeft] = useState(8070); // in seconds

  // Auto sliding offers timer
  useEffect(() => {
    const offerInterval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4500);
    return () => clearInterval(offerInterval);
  }, []);

  // Flash sale countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProductPress = (item: any) => {
    // Add to recently viewed if not already there
    if (!recentlyViewed.some((p) => p.id === item.id)) {
      setRecentlyViewed((prev) => [item, ...prev.slice(0, 4)]);
    }
    navigation.navigate('DressDetails', { item });
  };

  const cartItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* ── AUTO-SLIDING OFFERS TICKER ── */}
      <View style={[styles.offerTicker, { backgroundColor: colors.primary }]}>
        <Text style={styles.offerTickerText}>{OFFERS[offerIndex]}</Text>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logoText}>Femora</Text>
            <View style={styles.headerActions}>
              {/* Wishlist */}
              <TouchableOpacity
                style={styles.headerIconBtn}
                onPress={() => navigation.navigate('Wishlist')}
              >
                <Text style={styles.headerIconText}>🤍</Text>
                {wishlist.length > 0 && (
                  <View style={styles.redBadge}>
                    <Text style={styles.badgeText}>{wishlist.length}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Cart */}
              <TouchableOpacity
                style={styles.headerIconBtn}
                onPress={() => navigation.navigate('Cart')}
              >
                <Text style={styles.headerIconText}>👜</Text>
                {cartItemsCount > 0 && (
                  <View style={styles.goldBadge}>
                    <Text style={styles.badgeText}>{cartItemsCount}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity
                style={styles.headerIconBtn}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Text style={styles.headerIconText}>🔔</Text>
                <View style={styles.notifDot} />
              </TouchableOpacity>

              {/* Profile Avatar */}
              <TouchableOpacity
                style={styles.avatarWrapper}
                onPress={() => navigation.navigate('Profile')}
              >
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
                  }}
                  style={styles.avatar}
                />
                <View style={styles.avatarOnline} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.greetingBlock}>
            <Text style={styles.greetingSmall}>Welcome back</Text>
            <Text style={styles.greetingLarge}>Hello, Beautiful ✨</Text>
          </View>
        </Animated.View>

        {/* ── SEARCH BAR (NAVIGATES TO SEARCH SCREEN) ────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(80).duration(500)}
          style={styles.searchContainer}
        >
          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search luxury fashion</Text>
            <Text style={styles.voiceSearchIcon}>🎙️</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── HERO BANNER CAROUSEL ──────────────────────────────────────── */}
        <LuxuryBanner onExplore={(id) => navigation.navigate('Explore')} />

        {/* ── PREMIUM BENEFITS BAR ─────────────────────────────────────── */}
        <Animated.View
          entering={FadeInUp.delay(120).duration(500)}
          style={styles.benefitsRow}
        >
          <View style={styles.benefitCard}>
            <Text style={styles.benefitEmoji}>🚚</Text>
            <Text style={styles.benefitTitle}>Free Shipping</Text>
            <Text style={styles.benefitDesc}>Orders over ₹4,999</Text>
          </View>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitEmoji}>🛡️</Text>
            <Text style={styles.benefitTitle}>Secure Checkout</Text>
            <Text style={styles.benefitDesc}>UPI, Card, COD</Text>
          </View>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitEmoji}>🔄</Text>
            <Text style={styles.benefitTitle}>Easy Returns</Text>
            <Text style={styles.benefitDesc}>14-day pickups</Text>
          </View>
        </Animated.View>

        {/* ── FLASH SALE WITH COUNTDOWN TIMER ───────────────────────────── */}
        <View style={styles.flashSaleSection}>
          <View style={styles.flashSaleHeader}>
            <View style={styles.flashTitleRow}>
              <Text style={styles.flashEmoji}>⚡</Text>
              <Text style={styles.flashTitle}>Flash Sale</Text>
            </View>
            <View style={[styles.timerBadge, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.timerText, { color: colors.primary }]}>
                {formatTime(timeLeft)}
              </Text>
            </View>
          </View>
          <FlatList
            horizontal
            data={trendingProducts.slice(0, 3)}
            keyExtractor={(item) => 'flash-' + item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            renderItem={({ item, index }) => (
              <LuxuryProductCard
                item={{
                  ...item,
                  discount: item.discount + 5, // Extra 5% off for flash sale
                  price: Math.floor(item.price * 0.95),
                }}
                index={index}
                onPress={() => handleProductPress(item)}
              />
            )}
          />
        </View>

        {/* ── CATEGORY SECTION ──────────────────────────────────────────── */}
        <LuxurySectionHeader title="Shop by Category" delay={100} />
        <Animated.View entering={FadeInUp.delay(150).duration(500)}>
          <FlatList
            horizontal
            data={luxuryCategories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setActiveCategory(item.id);
                  navigation.navigate('Explore', { categoryId: item.id });
                }}
                activeOpacity={0.8}
                style={[
                  styles.categoryChip,
                  activeCategory === item.id && styles.categoryChipActive,
                ]}
              >
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    activeCategory === item.id && styles.categoryLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>

        {/* ── TOP BRANDS ────────────────────────────────────────────────── */}
        <LuxurySectionHeader title="👑 Top Designer Brands" delay={180} />
        <Animated.View entering={FadeInUp.delay(200).duration(500)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsList}
          >
            {BRANDS.map((brand, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.brandChip, { borderColor: colors.border }]}
                onPress={() => Alert.alert(brand.name, `Welcome to ${brand.name} Boutique.`)}
              >
                <Text style={styles.brandEmoji}>{brand.logo}</Text>
                <Text style={styles.brandName}>{brand.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── TRENDING TODAY ────────────────────────────────────────────── */}
        <LuxurySectionHeader
          title="🔥 Trending Today"
          onSeeAll={() => navigation.navigate('Explore')}
          delay={220}
        />
        <FlatList
          horizontal
          data={trendingProducts}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          renderItem={({ item, index }) => (
            <LuxuryProductCard
              item={item}
              index={index}
              onPress={() => handleProductPress(item)}
            />
          )}
        />

        {/* ── LUXURY COLLECTION ─────────────────────────────────────────── */}
        <LuxurySectionHeader
          title="💎 Luxury Collection"
          onSeeAll={() => navigation.navigate('Explore')}
          delay={250}
        />
        <FlatList
          horizontal
          data={luxuryCollectionProducts}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          renderItem={({ item, index }) => (
            <LuxuryProductCard
              item={item}
              index={index}
              onPress={() => handleProductPress(item)}
            />
          )}
        />

        {/* ── RECOMMENDED FOR YOU ───────────────────────────────────────── */}
        <LuxurySectionHeader
          title="🎁 Recommended For You"
          onSeeAll={() => navigation.navigate('Explore')}
          delay={300}
        />

        {/* AI tag strip */}
        <Animated.View
          entering={FadeInUp.delay(320).duration(500)}
          style={styles.aiTagStrip}
        >
          <Text style={styles.aiTagIcon}>✨</Text>
          <Text style={styles.aiTagText}>Personalised picks based on your style</Text>
          <View style={styles.aiMatchBadge}>
            <Text style={styles.aiMatchText}>92% Match</Text>
          </View>
        </Animated.View>

        <FlatList
          horizontal
          data={recommendedProducts}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          renderItem={({ item, index }) => (
            <LuxuryProductCard
              item={item}
              index={index}
              onPress={() => handleProductPress(item)}
            />
          )}
        />

        {/* ── RECENTLY VIEWED ───────────────────────────────────────────── */}
        {recentlyViewed.length > 0 && (
          <View>
            <LuxurySectionHeader title="👁️ Recently Viewed" delay={340} />
            <FlatList
              horizontal
              data={recentlyViewed}
              keyExtractor={(item) => 'recent-' + item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
              renderItem={({ item, index }) => (
                <LuxuryProductCard
                  item={item}
                  index={index}
                  onPress={() => handleProductPress(item)}
                />
              )}
            />
          </View>
        )}

        {/* ── WEDDING SPECIALS ──────────────────────────────────────────── */}
        <LuxurySectionHeader
          title="👗 Featured Collections"
          onSeeAll={() => navigation.navigate('Explore')}
          delay={360}
        />
        <Animated.View
          entering={FadeInUp.delay(380).duration(500)}
          style={styles.weddingGrid}
        >
          {weddingBanners.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.weddingCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Explore')}
            >
              <Image source={{ uri: item.image }} style={styles.weddingImage} />
              <View style={styles.weddingOverlay} />
              <View style={styles.weddingContent}>
                <Text style={styles.weddingTitle}>{item.title}</Text>
                <Text style={styles.weddingSubtitle}>{item.subtitle}</Text>
                <View style={styles.weddingBtn}>
                  <Text style={styles.weddingBtnText}>Explore →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* ── BEST SELLERS ──────────────────────────────────────────────── */}
        <LuxurySectionHeader
          title="⭐ Best Sellers"
          onSeeAll={() => navigation.navigate('Explore')}
          delay={400}
        />
        <FlatList
          horizontal
          data={bestSellers}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          renderItem={({ item, index }) => (
            <LuxuryProductCard
              item={item}
              index={index}
              onPress={() => handleProductPress(item)}
            />
          )}
        />

        {/* ── FOOTER SPACER ─────────────────────────────────────────────── */}
        <View style={styles.footerSpacer} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  offerTicker: {
    paddingVertical: 6,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerTickerText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110, // clear bottom navigation tab bar
  },

  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'serif',
    color: colors.primary,
    letterSpacing: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
    position: 'relative',
  },
  headerIconText: {
    fontSize: 16,
  },
  redBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E05252',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  goldBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '800',
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E05252',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  avatarWrapper: {
    position: 'relative',
    marginLeft: spacing.xs,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  avatarOnline: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5E8C61',
    borderWidth: 1.5,
    borderColor: '#F8F5F0',
  },
  greetingBlock: {
    gap: 1,
    marginTop: spacing.xs,
  },
  greetingSmall: {
    fontSize: 11,
    color: '#999',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  greetingLarge: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2C2C2C',
    fontFamily: 'serif',
    letterSpacing: 0.2,
  },

  // Search
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm,
    ...shadows.soft,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  searchIcon: {
    fontSize: 16,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#B8A898',
    fontSize: 14,
    fontWeight: '400',
  },
  voiceSearchIcon: {
    fontSize: 16,
    color: colors.primary,
  },

  // Benefits
  benefitsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  benefitCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  benefitEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  benefitTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  benefitDesc: {
    fontSize: 8,
    color: '#888',
    marginTop: 2,
    textAlign: 'center',
  },

  // Flash Sale
  flashSaleSection: {
    marginBottom: spacing.md,
  },
  flashSaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.sm,
  },
  flashTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flashEmoji: {
    fontSize: 18,
  },
  flashTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    fontFamily: 'serif',
  },
  timerBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: 'rgba(176,141,87,0.3)',
  },
  timerText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'monospace',
  },

  // Category
  categoryList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryIcon: {
    fontSize: 15,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    letterSpacing: 0.3,
  },
  categoryLabelActive: {
    color: '#FFFFFF',
  },

  // Brands
  brandsList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  brandChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    ...shadows.soft,
  },
  brandEmoji: {
    fontSize: 14,
  },
  brandName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444',
  },

  // Product Lists
  productList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },

  // AI Tag Strip
  aiTagStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  aiTagIcon: {
    fontSize: 16,
  },
  aiTagText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  aiMatchBadge: {
    backgroundColor: '#EEF7EF',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  aiMatchText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5E8C61',
  },

  // Wedding Specials
  weddingGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  weddingCard: {
    flex: 1,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.md,
  },
  weddingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  weddingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10,6,2,0.45)',
  },
  weddingContent: {
    ...StyleSheet.absoluteFill,
    padding: spacing.md,
    justifyContent: 'flex-end',
  },
  weddingTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  weddingSubtitle: {
    fontSize: 11,
    color: '#B08D57',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  weddingBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(166,138,100,0.85)',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: 12,
  },
  weddingBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  footerSpacer: {
    height: 80,
  },
});
