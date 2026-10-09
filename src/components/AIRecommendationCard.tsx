import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

interface AIRecommendationCardProps {
  image?: string;
  matchPercentage?: number;
  reason?: string;
  title?: string;
  ctaText?: string;
  onPress?: () => void;
}

const AIRecommendationCard = ({
  image = 'https://images.unsplash.com/photo-1515347619362-74944d6db598?q=80&w=300&auto=format&fit=crop',
  matchPercentage = 95,
  reason = 'Crafted from premium Mulberry silk, this piece perfectly complements your color profile and matches the upcoming seasonal trends.',
  title = "Today's Style Recommendation",
  ctaText = 'View Outfit',
  onPress,
}: AIRecommendationCardProps) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Text style={styles.matchScore}>{matchPercentage}% Match</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.desc} numberOfLines={4}>
            {reason}
          </Text>
          <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.buttonText}>{ctaText} →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default AIRecommendationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    ...shadows.medium,
    marginVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.subHeading,
    color: '#2C2C2C',
    fontWeight: '700',
    fontFamily: 'serif',
    letterSpacing: 0.2,
  },
  badge: {
    backgroundColor: '#FAF5EC',
    borderWidth: 1,
    borderColor: '#E8D8B8',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
  },
  matchScore: {
    ...typography.caption,
    color: '#B08D57',
    fontWeight: '700',
  },
  content: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#F5F0EA',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  desc: {
    ...typography.bodyMedium,
    color: '#666666',
    lineHeight: 18,
    fontSize: 13,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#B08D57', // Gold
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: borderRadius.round,
    marginTop: spacing.sm,
  },
  buttonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '700',
  },
});