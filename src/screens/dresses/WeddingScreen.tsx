import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing } from '../../theme';

const WeddingScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ScreenContainer>
      <LuxuryHeader title="Wedding" showBack />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Wedding Collection 🌸
      </Text>
    </ScreenContainer>
  );
};

export default WeddingScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
