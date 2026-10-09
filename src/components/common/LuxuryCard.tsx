import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../../theme';
import { borderRadius, shadows, spacing } from '../../theme';

export const LuxuryCard = ({ children, style, ...props }: ViewProps) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          ...(!isDarkMode && shadows.soft),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    borderWidth: 1,
    marginVertical: spacing.sm,
  },
});
