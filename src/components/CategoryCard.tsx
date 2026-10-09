import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colors, spacing, borderRadius, typography } from '../theme';

interface Props {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

const CategoryCard = ({ title, isActive = false, onPress }: Props) => {
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isPressed ? 0.95 : 1) }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.card, isActive && styles.activeCard]}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={0.9}
      >
        <Text style={[styles.title, isActive && styles.activeTitle]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.round,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  title: {
    ...typography.subHeading,
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTitle: {
    color: colors.white,
    fontWeight: '700',
  },
});