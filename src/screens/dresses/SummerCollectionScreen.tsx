import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing } from '../../theme';

const SummerCollectionScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ScreenContainer>
      <LuxuryHeader title="Summer Collection" showBack />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Summer Collection Collection 🌸
      </Text>
    </ScreenContainer>
  );
};

export default SummerCollectionScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
