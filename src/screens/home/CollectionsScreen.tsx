import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing, borderRadius, shadows } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.lg * 2;

interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  query: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: '1',
    title: 'Wedding Collection',
    subtitle: 'Royal bridal couture & guest attire',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    query: 'wedding',
  },
  {
    id: '2',
    title: 'Party Wear',
    subtitle: 'Sequin gowns & cocktail dresses',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop',
    query: 'party',
  },
  {
    id: '3',
    title: 'Luxury Collection',
    subtitle: 'Limited edition designer edits',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
    query: 'luxury',
  },
  {
    id: '4',
    title: 'Western Wear',
    subtitle: 'Chic silhouettes & everyday luxury',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    query: 'dress',
  },
  {
    id: '5',
    title: 'Traditional Wear',
    subtitle: 'Heritage sarees & exquisite lehengas',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    query: 'saree',
  },
  {
    id: '6',
    title: 'Office Wear',
    subtitle: 'Power suits & professional separates',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=600&auto=format&fit=crop',
    query: 'office',
  },
  {
    id: '7',
    title: 'Accessories',
    subtitle: 'Designer belts, scarves & hats',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    query: 'accessory',
  },
  {
    id: '8',
    title: 'Jewellery',
    subtitle: 'Fine gold, diamond & pearl ornaments',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    query: 'jewellery',
  },
  {
    id: '9',
    title: 'Shoes & Heels',
    subtitle: 'Cinderella pumps & designer boots',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop',
    query: 'heels',
  },
  {
    id: '10',
    title: 'Bags & clutches',
    subtitle: 'Classic leather totes & statement clutches',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    query: 'bags',
  },
  {
    id: '11',
    title: 'Beauty & Fragrance',
    subtitle: 'Premium cosmetics & signatures scents',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    query: 'beauty',
  },
  {
    id: '12',
    title: 'Designer Brands',
    subtitle: 'Exclusive curations from top design houses',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
    query: 'luxe',
  },
];

const CollectionsScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const handleCollectionPress = (item: CollectionItem) => {
    navigation.navigate('Search', { query: item.query });
  };

  return (
    <ScreenContainer style={styles.noHorizontalPadding}>
      <StatusBar barStyle="dark-content" />
      <LuxuryHeader title="Explore Collections" />

      <Animated.View
        entering={FadeInDown.duration(500)}
        style={styles.introBlock}
      >
        <Text style={[styles.introTitle, { color: colors.textPrimary }]}>
          Curated Elegance
        </Text>
        <Text style={[styles.introSubtitle, { color: colors.textSecondary }]}>
          Browse carefully selected couture, footwear, jewellery and beauty lines crafted for your distinguished style.
        </Text>
      </Animated.View>

      <FlatList
        data={COLLECTIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.delay(index * 100).duration(500)}
            style={styles.cardContainer}
          >
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => handleCollectionPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.overlay} />

              <View style={styles.cardContent}>
                <View style={styles.labelWrapper}>
                  <Text style={styles.goldBadge}>✦ COUTURE</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.ctaText}>DISCOVER COLLECTION →</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </ScreenContainer>
  );
};

export default CollectionsScreen;

const styles = StyleSheet.create({
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
  introBlock: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  introTitle: {
    fontSize: 22,
    fontFamily: 'serif',
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  introSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 110, // clear tab navigation
    gap: spacing.lg,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.medium,
  },
  card: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(28, 22, 16, 0.45)', // Premium dark bronze/tint overlay
  },
  cardContent: {
    ...StyleSheet.absoluteFill,
    padding: spacing.xl,
    justifyContent: 'flex-end',
  },
  labelWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 6,
  },
  goldBadge: {
    fontSize: 8,
    color: '#FFF',
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    marginBottom: spacing.md,
  },
  ctaText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B08D57', // Gold text link
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
