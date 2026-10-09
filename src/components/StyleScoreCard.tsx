import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

interface StyleScoreCardProps {
  styleScore: number;
  colorScore: number;
  trendScore: number;
  style?: object;
}

const ScoreItem = ({ label, score, color }: { label: string; score: number; color: string }) => {
  return (
    <View style={styles.scoreRow}>
      <View style={styles.scoreInfo}>
        <Text style={styles.scoreLabel}>{label}</Text>
        <Text style={[styles.scoreValue, { color }]}>{score}%</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const StyleScoreCard = ({
  styleScore = 95,
  colorScore = 88,
  trendScore = 92,
  style,
}: StyleScoreCardProps) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      style={[styles.card, style]}
    >
      <Text style={styles.title}>✦ Style Compatibility Report</Text>
      <View style={styles.divider} />
      
      <ScoreItem label="Style Match" score={styleScore} color="#B08D57" />
      <ScoreItem label="Color Match" score={colorScore} color="#C8B08A" />
      <ScoreItem label="Trend Score" score={trendScore} color="#5E8C61" />
      
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          ✨ This outfit scores exceptionally high on color coordination and matches the seasonal luxury trend index.
        </Text>
      </View>
    </Animated.View>
  );
};

export default StyleScoreCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    ...shadows.medium,
    marginVertical: spacing.md,
  },
  title: {
    ...typography.subHeading,
    color: '#2C2C2C',
    fontWeight: '700',
    fontFamily: 'serif',
    letterSpacing: 0.3,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F0EA',
    marginBottom: spacing.lg,
  },
  scoreRow: {
    marginBottom: spacing.md,
  },
  scoreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  scoreLabel: {
    ...typography.bodyMedium,
    color: '#666666',
    fontWeight: '500',
  },
  scoreValue: {
    ...typography.bodyLarge,
    fontWeight: '700',
    fontFamily: 'serif',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F8F5F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  summaryBox: {
    backgroundColor: '#FBF9F6',
    padding: spacing.md,
    borderRadius: 16,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: '#F5F0EA',
  },
  summaryText: {
    ...typography.caption,
    color: '#8A7A68',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
