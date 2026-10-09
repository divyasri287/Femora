import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, typography, spacing, borderRadius } from '../../theme';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface EmptyStateProps {
  emoji: string;
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export const EmptyState = ({
  emoji,
  title,
  message,
  buttonText,
  onButtonPress,
}: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Premium line art / emoji circle */}
      <View style={[styles.circle, { backgroundColor: colors.secondary }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>

      {buttonText && onButtonPress && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onButtonPress}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, { color: colors.white }]}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.huge,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1.5,
    borderColor: '#EAE4DC',
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    ...typography.heading2,
    fontFamily: 'serif',
    marginBottom: spacing.sm,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  message: {
    ...typography.bodyMedium,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 20,
    maxWidth: '85%',
  },
  button: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.round,
    elevation: 2,
  },
  btnText: {
    ...typography.bodyLarge,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
export default EmptyState;
