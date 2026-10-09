import React, { useRef, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

const { width } = Dimensions.get('window');

const banners = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    title: 'Elevate Your Style',
    subtitle: 'Premium Luxury Collection',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
    title: 'Summer Elegance',
    subtitle: 'Discover Exclusive Picks',
  },
];

const BannerSlider = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banners.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3500);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={banners}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width)
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.bannerContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <View style={styles.overlay}>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  bannerContainer: {
    width: width - spacing.lg * 2,
    marginHorizontal: spacing.lg,
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: spacing.lg,
  },
  subtitle: {
    ...typography.caption,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: colors.white,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
  },
  buttonText: {
    ...typography.buttonText,
    color: colors.white,
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
  },
});