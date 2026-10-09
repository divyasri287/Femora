import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing } from '../../theme';

const TrendingScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ScreenContainer>
      <LuxuryHeader title="Trending" showBack />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Trending Collection 🌸
      </Text>
    </ScreenContainer>
  );
};

export default TrendingScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
