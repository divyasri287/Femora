// ─── LuxurySectionHeader ─────────────────────────────────────────────────────
// A premium section header with an animated gold underline accent.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { colors, spacing, typography } from '../theme';

interface LuxurySectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  delay?: number;
}

const LuxurySectionHeader = ({
  title,
  onSeeAll,
  delay = 0,
}: LuxurySectionHeaderProps) => {
  return (
    <Animated.View
      entering={FadeInLeft.delay(delay).duration(500)}
      style={styles.container}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.underline} />
      </View>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See All →</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default LuxurySectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  titleWrapper: {
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'serif',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  underline: {
    width: 40,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.5,
  },
});
