import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { spacing, typography } from '../../theme';

interface Props extends TextInputProps {
  label?: string; // Optional for backward compatibility, but omitted when not supplied
  error?: string;
}

const MinimalEyeIcon = ({ visible, color }: { visible: boolean; color: string }) => (
  <View style={styles.eyeContainer}>
    <View style={[styles.eyeShape, { borderColor: color }]}>
      <View style={[styles.eyePupil, { backgroundColor: color }]} />
    </View>
    {!visible && <View style={[styles.eyeSlash, { backgroundColor: color }]} />}
  </View>
);

export const LuxuryInput = ({ label, error, style, secureTextEntry, ...props }: Props) => {
  const { colors } = useTheme();
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);
  const focusAnim = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      [error ? colors.error : colors.border, colors.primary] // #ECE7DD to #B8924A
    );
    const shadowOpacity = interpolateColor(
      focusAnim.value,
      [0, 1],
      ['rgba(26, 26, 26, 0.03)', 'rgba(184, 146, 74, 0.12)']
    );
    return {
      borderColor,
      shadowColor: shadowOpacity,
    };
  });

  const handleFocus = (e: any) => {
    focusAnim.value = withTiming(1, { duration: 220 });
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: any) => {
    focusAnim.value = withTiming(0, { duration: 220 });
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text> : null}
      
      <Animated.View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: '#FFFFFF',
          },
          animatedStyle,
          style,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { color: colors.textPrimary },
          ]}
          placeholderTextColor="#999999"
          secureTextEntry={secureTextEntry ? isSecure : false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.eyeButton}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <MinimalEyeIcon visible={!isSecure} color="#777777" />
          </TouchableOpacity>
        )}
      </Animated.View>

      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  label: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    height: 60,
    borderRadius: 20,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 0,
  },
  eyeButton: {
    paddingLeft: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeContainer: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeShape: {
    width: 19,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyePupil: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
  },
  eyeSlash: {
    position: 'absolute',
    width: 20,
    height: 1.5,
    transform: [{ rotate: '-45deg' }],
  },
  error: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
