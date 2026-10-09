import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          button: [styles.secondary, disabled && styles.disabled],
          text: styles.secondaryText,
        };
      case 'outline':
        return {
          button: [styles.outline, disabled && styles.disabledOutline],
          text: styles.outlineText,
        };
      case 'primary':
      default:
        return {
          button: [styles.primary, disabled && styles.disabled],
          text: styles.primaryText,
        };
    }
  };

  const { button: variantStyle, text: variantTextStyle } = getVariantStyles();

  return (
    <TouchableOpacity
      style={[styles.container, variantStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.white}
        />
      ) : (
        <Text style={[styles.text, variantTextStyle, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    ...shadows.sm,
  },
  text: {
    ...typography.buttonText,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.white,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  secondaryText: {
    color: colors.textPrimary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  disabled: {
    backgroundColor: colors.border,
  },
  disabledOutline: {
    borderColor: colors.border,
  },
});
