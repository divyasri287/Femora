// ─── LuxuryBanner ────────────────────────────────────────────────────────────
// Hero banner carousel with auto-scroll, elegant overlays, and pagination dots.

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows } from '../theme';
import { heroBanners } from '../data/homeData';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width;

interface LuxuryBannerProps {
  onExplore?: (bannerId: string) => void;
}

const LuxuryBanner = ({ onExplore }: LuxuryBannerProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % heroBanners.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollEnd = (event: any) => {
    const idx = Math.round(
      event.nativeEvent.contentOffset.x / BANNER_WIDTH
    );
    setCurrentIndex(idx);
    // Reset timer on manual scroll
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoScroll();
  };

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        snapToInterval={BANNER_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        data={heroBanners}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.bannerCard}>
            {/* Background Image */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Dark gradient overlay */}
            <View style={styles.gradientOverlay} />

            {/* Content */}
            <View style={styles.textContent}>
              {/* Tag */}
              <View style={styles.tagRow}>
                <View style={styles.tagLine} />
                <Text style={styles.tag}>{item.tag}</Text>
              </View>

              {/* Title */}
              <Text style={styles.title}>{item.title}</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              {/* CTA Button */}
              <TouchableOpacity
                style={styles.ctaButton}
                activeOpacity={0.85}
                onPress={() => onExplore?.(item.id)}
              >
                <Text style={styles.ctaText}>{item.cta}</Text>
                <Text style={styles.ctaArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {heroBanners.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setCurrentIndex(i);
              flatListRef.current?.scrollToIndex({ index: i, animated: true });
            }}
          >
            <View
              style={[
                styles.dot,
                i === currentIndex && styles.activeDot,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export default LuxuryBanner;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: 0,
    gap: 0,
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: 240,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10,8,6,0.42)',
  },
  textContent: {
    ...StyleSheet.absoluteFill,
    padding: spacing.xl,
    justifyContent: 'flex-end',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagLine: {
    width: 20,
    height: 1.5,
    backgroundColor: colors.secondary,
  },
  tag: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondary,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    lineHeight: 34,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.lg,
    letterSpacing: 0.3,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.round,
    gap: spacing.sm,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
  },
  ctaArrow: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4C4B0',
  },
  activeDot: {
    width: 22,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
});
