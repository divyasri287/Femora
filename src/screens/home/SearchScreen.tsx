import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Dimensions,
  Alert,
  StatusBar,
  Pressable,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { ScreenContainer } from '../../components/common';
import LuxuryProductCard from '../../components/LuxuryProductCard';
import { useTheme, typography, spacing, borderRadius, shadows } from '../../theme';
import {
  trendingProducts,
  luxuryCollectionProducts,
  recommendedProducts,
  bestSellers,
} from '../../data/homeData';

const { width } = Dimensions.get('window');

// Combine all product data to query from
const ALL_PRODUCTS = [
  ...trendingProducts,
  ...luxuryCollectionProducts,
  ...recommendedProducts,
  ...bestSellers,
];

// Deduplicate items by ID
const DUP_KEYS = new Set();
const SEARCHABLE_PRODUCTS = ALL_PRODUCTS.filter((item) => {
  if (DUP_KEYS.has(item.id)) return false;
  DUP_KEYS.add(item.id);
  return true;
});

const TRENDING_TAGS = ['Lehenga', 'Silk Dress', 'Saree', 'Emerald Gown', 'Totes', 'Heels'];

const SearchScreen = ({ route, navigation }: any) => {
  const { colors } = useTheme();

  // Search queries
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Ivory wrap dress',
    'saree',
    'Gucci',
  ]);

  // Voice search modal
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voicePulse, setVoicePulse] = useState(false);

  // Filter drawer/modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState('none'); // 'lowHigh' | 'highLow' | 'rating'
  const [priceFilter, setPriceFilter] = useState<number | null>(null); // price ceiling
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load category query from explore navigation parameters if available
  useEffect(() => {
    if (route.params?.query) {
      setSearchText(route.params.query);
    }
  }, [route.params?.query]);

  // Simulate voice recording
  const handleVoiceSearch = () => {
    setShowVoiceModal(true);
    setVoicePulse(true);
    setTimeout(() => {
      setVoicePulse(false);
      setShowVoiceModal(false);
      setSearchText('Ivory Gown');
      Alert.alert('Voice Search', 'Voice recognized: "Ivory Gown"');
    }, 2500);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleTagPress = (tag: string) => {
    setSearchText(tag);
    if (!recentSearches.includes(tag)) {
      setRecentSearches((prev) => [tag, ...prev]);
    }
  };

  const handleSearchSubmit = (text: string) => {
    if (text.trim() && !recentSearches.includes(text.trim())) {
      setRecentSearches((prev) => [text.trim(), ...prev.slice(0, 4)]);
    }
  };

  // Perform search, filtering, and sorting
  const getFilteredProducts = () => {
    let result = [...SEARCHABLE_PRODUCTS];

    // 1. Search text filter
    if (searchText.trim()) {
      const query = searchText.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // 2. Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.brand.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // 3. Price filter
    if (priceFilter) {
      result = result.filter((p) => p.price <= priceFilter);
    }

    // 4. Sort
    if (selectedSort === 'lowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'highLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();
  const searchSuggestions = SEARCHABLE_PRODUCTS.filter(
    (p) =>
      searchText &&
      p.name.toLowerCase().includes(searchText.toLowerCase()) &&
      p.name.toLowerCase() !== searchText.toLowerCase()
  ).slice(0, 5);

  return (
    <ScreenContainer style={styles.noPadding}>
      <StatusBar barStyle="dark-content" />

      {/* ── Search Bar Input ── */}
      <View style={[styles.searchBarHeader, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={{ fontSize: 22, color: colors.textPrimary }}>←</Text>
        </TouchableOpacity>
        <View style={[styles.searchBox, { backgroundColor: colors.secondary }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search luxury fashion"
            placeholderTextColor="#B8A898"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearchSubmit(searchText)}
            autoFocus
          />
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleVoiceSearch}>
              <Text style={styles.micIcon}>🎙️</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          style={[styles.filterBtn, { backgroundColor: colors.primary }]}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterBtnText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* ── Search Content ── */}
      {!searchText && (
        <ScrollView style={styles.suggestScroll} showsVerticalScrollIndicator={false}>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <Animated.View entering={FadeInDown.duration(400)} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  Recent Searches
                </Text>
                <TouchableOpacity onPress={handleClearRecent}>
                  <Text style={[styles.clearAllText, { color: colors.primary }]}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>
              {recentSearches.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.recentItem}
                  onPress={() => handleTagPress(item)}
                >
                  <Text style={styles.recentItemClock}>🕒</Text>
                  <Text style={[styles.recentItemText, { color: colors.textSecondary }]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          {/* Trending Tags */}
          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: 12 }]}>
              Trending Searches
            </Text>
            <View style={styles.tagsContainer}>
              {TRENDING_TAGS.map((tag, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.tagChip, { borderColor: colors.border }]}
                  onPress={() => handleTagPress(tag)}
                >
                  <Text style={[styles.tagChipText, { color: colors.textPrimary }]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Top Brands banner */}
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.luxeBanner}>
            <Text style={styles.luxeBannerTitle}>Femora Bespoke Custom Styling</Text>
            <Text style={styles.luxeBannerSubtitle}>
              Scan coordinates of your desired styles directly using our AI Stylist.
            </Text>
            <TouchableOpacity
              style={[styles.luxeBannerBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('AIStylist')}
            >
              <Text style={{ color: '#FFF', fontWeight: '800', fontSize: 11 }}>
                Open Stylist ✨
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      )}

      {/* ── Search Suggestions (While typing) ── */}
      {searchText && searchSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {searchSuggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.suggestionItem, { borderBottomColor: colors.border }]}
              onPress={() => handleTagPress(item.name)}
            >
              <Text style={styles.suggestionIcon}>🔍</Text>
              <Text style={[styles.suggestionText, { color: colors.textPrimary }]} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ── Search Results Grid ── */}
      {searchText.length > 0 && (
        <View style={{ flex: 1 }}>
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
              Found {filteredProducts.length} luxury items
            </Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🛍️</Text>
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                No luxury matches found
              </Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                Try adjusting your search terms or filters for better matches.
              </Text>
              <TouchableOpacity
                style={[styles.resetBtn, { backgroundColor: colors.primary }]}
                onPress={() => setSearchText('')}
              >
                <Text style={{ color: '#FFF', fontWeight: '800' }}>Clear Search</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              numColumns={2}
              keyExtractor={(item) => 'result-' + item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.gridContent}
              renderItem={({ item, index }) => (
                <LuxuryProductCard
                  item={item}
                  index={index}
                  onPress={() => navigation.navigate('DressDetails', { item })}
                  style={{ marginRight: spacing.sm, marginLeft: spacing.sm }}
                />
              )}
            />
          )}
        </View>
      )}

      {/* ── Voice Search Listening Modal ── */}
      <Modal visible={showVoiceModal} transparent animationType="fade">
        <View style={styles.voiceModalBackdrop}>
          <Animated.View entering={ZoomIn.duration(300)} style={styles.voiceModalCard}>
            <Text style={styles.voiceModalTitle}>Listening...</Text>
            <Text style={styles.voiceModalSubtitle}>Speak to search luxury fabrics & brands</Text>
            <View style={[styles.micCircle, voicePulse && styles.micCirclePulse]}>
              <Text style={styles.micEmoji}>🎙️</Text>
            </View>
            <TouchableOpacity
              style={styles.voiceCancelBtn}
              onPress={() => setShowVoiceModal(false)}
            >
              <Text style={styles.voiceCancelText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* ── Sort & Filter Drawer Modal ── */}
      <Modal visible={showFilterModal} transparent animationType="slide">
        <Pressable style={styles.drawerBackdrop} onPress={() => setShowFilterModal(false)}>
          <Animated.View entering={FadeInDown.duration(300)} style={styles.drawerCard}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Sort & Filter</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Text style={styles.drawerClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.drawerScroll} showsVerticalScrollIndicator={false}>
              {/* Sort Options */}
              <Text style={styles.drawerSectionTitle}>Sort By</Text>
              <View style={styles.filterOptionGroup}>
                <TouchableOpacity
                  style={[styles.filterOption, selectedSort === 'lowHigh' && styles.filterOptionActive]}
                  onPress={() => setSelectedSort(selectedSort === 'lowHigh' ? 'none' : 'lowHigh')}
                >
                  <Text style={selectedSort === 'lowHigh' ? styles.filterTextActive : styles.filterText}>
                    Price: Low to High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterOption, selectedSort === 'highLow' && styles.filterOptionActive]}
                  onPress={() => setSelectedSort(selectedSort === 'highLow' ? 'none' : 'highLow')}
                >
                  <Text style={selectedSort === 'highLow' ? styles.filterTextActive : styles.filterText}>
                    Price: High to Low
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterOption, selectedSort === 'rating' && styles.filterOptionActive]}
                  onPress={() => setSelectedSort(selectedSort === 'rating' ? 'none' : 'rating')}
                >
                  <Text style={selectedSort === 'rating' ? styles.filterTextActive : styles.filterText}>
                    Customer Rating
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Price Cap Filter */}
              <Text style={styles.drawerSectionTitle}>Price Ceiling</Text>
              <View style={styles.filterOptionGroup}>
                {[3000, 5000, 8000, 15000].map((price) => (
                  <TouchableOpacity
                    key={price}
                    style={[styles.filterOption, priceFilter === price && styles.filterOptionActive]}
                    onPress={() => setPriceFilter(priceFilter === price ? null : price)}
                  >
                    <Text style={priceFilter === price ? styles.filterTextActive : styles.filterText}>
                      Under ₹{price.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Categories */}
              <Text style={styles.drawerSectionTitle}>Refine Collection</Text>
              <View style={styles.filterOptionGroup}>
                {['All', 'Dress', 'Lehenga', 'Saree', 'Kurta', 'Gown'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.filterOption, selectedCategory === cat && styles.filterOptionActive]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text style={selectedCategory === cat ? styles.filterTextActive : styles.filterText}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyBtnText}>Apply Refinement</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </ScreenContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
  },
  searchBarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  backBtn: {
    padding: spacing.xs,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    gap: spacing.sm,
  },
  searchIcon: {
    fontSize: 14,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    fontWeight: '500',
  },
  clearIcon: {
    fontSize: 13,
    color: '#888',
    paddingHorizontal: spacing.xs,
  },
  micIcon: {
    fontSize: 14,
    color: '#B08D57',
    paddingHorizontal: spacing.xs,
  },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  filterBtnText: {
    fontSize: 16,
    color: '#FFF',
  },
  suggestScroll: {
    flex: 1,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'serif',
    letterSpacing: 0.3,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: '700',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EDE8E0',
    gap: spacing.md,
  },
  recentItemClock: {
    fontSize: 13,
  },
  recentItemText: {
    fontSize: 14,
    fontWeight: '400',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tagChip: {
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  tagChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  luxeBanner: {
    backgroundColor: '#FAF5EC',
    borderRadius: 18,
    padding: spacing.xl,
    marginVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE4DC',
  },
  luxeBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C2C2C',
    fontFamily: 'serif',
    marginBottom: 4,
    textAlign: 'center',
  },
  luxeBannerSubtitle: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: spacing.md,
  },
  luxeBannerBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 8,
    borderRadius: 12,
  },

  // Suggestions
  suggestionsContainer: {
    position: 'absolute',
    top: 75,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: '#FFF',
    borderRadius: borderRadius.lg,
    ...shadows.lg,
    zIndex: 200,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    gap: spacing.md,
  },
  suggestionIcon: {
    fontSize: 12,
    color: '#AAA',
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },

  // Results
  resultsHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: '#FAF7F2',
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  gridContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
    marginTop: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.xl,
  },
  resetBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 15,
  },

  // Voice Search Modal
  voiceModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceModalCard: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadows.lg,
  },
  voiceModalTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'serif',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  voiceModalSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  micCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FAF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    borderWidth: 2,
    borderColor: '#B08D57',
  },
  micCirclePulse: {
    backgroundColor: '#EAE4DC',
    transform: [{ scale: 1.1 }],
  },
  micEmoji: {
    fontSize: 34,
  },
  voiceCancelBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  voiceCancelText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '700',
  },

  // Filter Drawer Modal
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  drawerCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xl,
    maxHeight: '80%',
    ...shadows.lg,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDE8E0',
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'serif',
    color: '#2C2C2C',
  },
  drawerClose: {
    fontSize: 18,
    color: '#666',
    fontWeight: '700',
  },
  drawerScroll: {
    marginBottom: spacing.xl,
  },
  drawerSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B08D57',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  filterOptionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterOption: {
    borderWidth: 1,
    borderColor: '#EDE8E0',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  filterOptionActive: {
    backgroundColor: '#B08D57',
    borderColor: '#B08D57',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
  filterTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  applyBtn: {
    backgroundColor: '#B08D57',
    height: 50,
    borderRadius: borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
    ...shadows.sm,
  },
  applyBtnText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
