import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing } from '../../theme';

const PartyWearScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ScreenContainer>
      <LuxuryHeader title="Party Wear" showBack />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Party Wear Collection 🌸
      </Text>
    </ScreenContainer>
  );
};

export default PartyWearScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
