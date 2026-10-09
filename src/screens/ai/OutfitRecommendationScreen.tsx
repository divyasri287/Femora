import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { colors, spacing, borderRadius, shadows, typography } from '../../theme';

const { width } = Dimensions.get('window');

interface OutfitItem {
  id: string;
  category: 'Dress' | 'Bag' | 'Shoes' | 'Jewellery';
  name: string;
  price: number;
  image: string;
  description: string;
}

const OUTFITS_DATABASE: Record<string, { title: string; image: string; items: OutfitItem[] }> = {
  wedding: {
    title: 'Bridal Radiance Ensemble',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    items: [
      { id: 'w_d', category: 'Dress', name: 'Ivory Silk Wedding Gown', price: 8999, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop', description: 'Premium Mulberry silk satin with custom hand embroidery.' },
      { id: 'w_b', category: 'Bag', name: 'Couture Pearl Clutch', price: 3499, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=200&auto=format&fit=crop', description: 'Embellished with fresh-water seed pearls.' },
      { id: 'w_s', category: 'Shoes', name: 'Lace Bridal Stilettos', price: 2999, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200&auto=format&fit=crop', description: 'Chantilly lace mesh overlays with a 4-inch heel.' },
      { id: 'w_j', category: 'Jewellery', name: 'Polki Diamond Choker Set', price: 12499, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200&auto=format&fit=crop', description: 'Authentic 22kt gold-plated Polki setting.' },
    ],
  },
  party: {
    title: 'Cocktail Gala Ensemble',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop',
    items: [
      { id: 'p_d', category: 'Dress', name: 'Champagne Sequin Gown', price: 6799, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=200&auto=format&fit=crop', description: 'Form-fitting silhouette covered in micro-shimmer sequins.' },
      { id: 'p_b', category: 'Bag', name: 'Metallic Gold Clutch', price: 2199, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a690?q=80&w=200&auto=format&fit=crop', description: 'Rigid structure with a luxury clasp lock.' },
      { id: 'p_s', category: 'Shoes', name: 'Glitter Ankle Strap Heels', price: 1899, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop', description: 'Metallic finish block heel with rhinestone wraps.' },
      { id: 'p_j', category: 'Jewellery', name: 'Crystal Drop Earrings', price: 999, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200&auto=format&fit=crop', description: 'Swarovski elements in a rhodium-plated silver.' },
    ],
  },
  office: {
    title: 'Corporate Executive Ensemble',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    items: [
      { id: 'o_d', category: 'Dress', name: 'Structured Blazer Dress', price: 4299, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=200&auto=format&fit=crop', description: 'Double-breasted formal wrap dress in oatmeal linen.' },
      { id: 'o_b', category: 'Bag', name: 'Tan Leather Luxury Tote', price: 3199, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200&auto=format&fit=crop', description: 'Full grain leather with separate tablet compartment.' },
      { id: 'o_s', category: 'Shoes', name: 'Pointed Toe Nude Flats', price: 1599, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop', description: 'Soft calfskin leather in neutral beige tone.' },
      { id: 'o_j', category: 'Jewellery', name: 'Minimalist Gold Studs', price: 799, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop', description: '18kt gold plated hoops in a matte brushed finish.' },
    ],
  },
  casual: {
    title: 'Sunday Brunch Ensemble',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop',
    items: [
      { id: 'c_d', category: 'Dress', name: 'Blush Floral Maxi Dress', price: 2799, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=200&auto=format&fit=crop', description: 'Breathable georgette print with side slits.' },
      { id: 'c_b', category: 'Bag', name: 'Woven Rattan Crossbody', price: 1299, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a690?q=80&w=200&auto=format&fit=crop', description: 'Circular design made with hand-woven straw.' },
      { id: 'c_s', category: 'Shoes', name: 'Tan Leather Slides', price: 999, image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=200&auto=format&fit=crop', description: 'Flat comfort slip-on sandals.' },
      { id: 'c_j', category: 'Jewellery', name: 'Rose Quartz Pendant', price: 899, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200&auto=format&fit=crop', description: 'Natural pink quartz on an elegant fine chain.' },
    ],
  },
  college: {
    title: 'Smart Casual Collage Ensemble',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop',
    items: [
      { id: 'g_d', category: 'Dress', name: 'Rose Lace Co-ord Set', price: 2999, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=200&auto=format&fit=crop', description: 'Two-piece matching top and high waist pleated skirt.' },
      { id: 'g_b', category: 'Bag', name: 'Canvas Logo Tote Bag', price: 1099, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=200&auto=format&fit=crop', description: 'Durable cream canvas with premium leather handles.' },
      { id: 'g_s', category: 'Shoes', name: 'White Platform Sneakers', price: 1499, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop', description: 'Ergonomic leather shoes with gold hardware.' },
      { id: 'g_j', category: 'Jewellery', name: 'Chunky Silver Hoop Earrings', price: 499, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop', description: 'Polished sterling silver tube hoops.' },
    ],
  },
  luxury: {
    title: 'Exquisite Heritage Couture',
    image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=600&auto=format&fit=crop',
    items: [
      { id: 'l_d', category: 'Dress', name: 'Pearl Embellished Lehenga', price: 12999, image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=200&auto=format&fit=crop', description: 'Heritage craftsmanship with over 2000 seed pearls.' },
      { id: 'l_b', category: 'Bag', name: 'Satin Evening Clutch', price: 4199, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a690?q=80&w=200&auto=format&fit=crop', description: 'Emerald satin pouch bag with crystal chain.' },
      { id: 'l_s', category: 'Shoes', name: 'Crystal Embellished Pumps', price: 5499, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop', description: 'Designer evening pumps with diamond-cut buckles.' },
      { id: 'l_j', category: 'Jewellery', name: 'Emerald Diamond Earrings', price: 8999, image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200&auto=format&fit=crop', description: 'Faceted teardrop emeralds surrounded by pave diamonds.' },
    ],
  },
};

const OutfitRecommendationScreen = ({ route, navigation }: any) => {
  const { lookType = 'party' } = route.params || {};
  const currentSetup = OUTFITS_DATABASE[lookType] || OUTFITS_DATABASE['party'];

  // Track selection state of items
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    [currentSetup.items[0].id]: true,
    [currentSetup.items[1].id]: true,
    [currentSetup.items[2].id]: true,
    [currentSetup.items[3].id]: true,
  });

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getSelectedTotal = () => {
    return currentSetup.items
      .filter((item) => selectedItems[item.id])
      .reduce((sum, item) => sum + item.price, 0);
  };

  const handleAddToBag = () => {
    const selectedCount = Object.values(selectedItems).filter(Boolean).length;
    if (selectedCount === 0) {
      Alert.alert('Selection Empty', 'Please select at least one item to add to the bag.');
      return;
    }
    Alert.alert(
      'Bag Updated',
      `Successfully added ${selectedCount} stylized item(s) to your shopping bag!`,
      [{ text: 'Great', onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <ScreenContainer scrollable>
      <LuxuryHeader title="AI Outfit Builder" showBack />

      {/* ── Look Cover Banner ── */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={styles.bannerContainer}
      >
        <Image source={{ uri: currentSetup.image }} style={styles.bannerImage} />
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTag}>✦ Stylist Recommendation</Text>
          <Text style={styles.bannerTitle}>{currentSetup.title}</Text>
        </View>
      </Animated.View>

      {/* ── Section Title ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Complete Your Look</Text>
        <View style={styles.underline} />
      </View>

      {/* ── Outfit Items List ── */}
      <View style={styles.itemsList}>
        {currentSetup.items.map((item, index) => {
          const isSelected = !!selectedItems[item.id];
          return (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(index * 100).duration(450)}
              style={[styles.itemCard, isSelected && styles.itemCardSelected]}
            >
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <Text style={styles.itemPrice}>₹{item.price.toLocaleString()}</Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                onPress={() => toggleItem(item.id)}
                activeOpacity={0.8}
              >
                {isSelected && <Text style={styles.checkboxCheck}>✓</Text>}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* ── Total Cost & Add to Bag ── */}
      <Animated.View
        entering={FadeInDown.delay(350).duration(500)}
        style={styles.summaryCard}
      >
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Stylized Price</Text>
          <Text style={styles.summaryPrice}>₹{getSelectedTotal().toLocaleString()}</Text>
        </View>
        <Text style={styles.summarySubtext}>Includes all selected items tailored for you.</Text>
        
        <TouchableOpacity
          style={styles.bagBtn}
          onPress={handleAddToBag}
          activeOpacity={0.85}
        >
          <Text style={styles.bagBtnText}>Add Entire Look to Bag</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.footerSpacer} />
    </ScreenContainer>
  );
};

export default OutfitRecommendationScreen;

const styles = StyleSheet.create({
  bannerContainer: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    position: 'relative',
    ...shadows.medium,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(44, 44, 44, 0.4)',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  bannerTag: {
    fontSize: 9,
    fontWeight: '700',
    color: '#EAE4DC',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    marginTop: 4,
  },

  // Section Header
  sectionHeader: {
    marginBottom: spacing.md,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    fontFamily: 'serif',
    letterSpacing: 0.2,
  },
  underline: {
    width: 32,
    height: 2,
    backgroundColor: '#B08D57',
    borderRadius: 1,
  },

  // Items List
  itemsList: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    padding: spacing.md,
    ...shadows.soft,
  },
  itemCardSelected: {
    borderColor: '#B08D57', // Highlight active border gold
  },
  itemImage: {
    width: 64,
    height: 76,
    borderRadius: 12,
    backgroundColor: '#F5F0EA',
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
    gap: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B08D57',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2C2C2C',
    fontFamily: 'serif',
  },
  itemDesc: {
    fontSize: 11,
    color: '#888888',
    lineHeight: 14,
  },

  // Checkbox
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D4C8B8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    backgroundColor: '#B08D57',
    borderColor: '#B08D57',
  },
  checkboxCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Summary Card
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    padding: spacing.xl,
    ...shadows.medium,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8A7A68',
  },
  summaryPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C2C2C',
    fontFamily: 'serif',
  },
  summarySubtext: {
    fontSize: 11,
    color: '#888888',
    marginBottom: spacing.lg,
  },
  bagBtn: {
    backgroundColor: '#B08D57',
    paddingVertical: spacing.md + 2,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  bagBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  footerSpacer: {
    height: 60,
  },
});