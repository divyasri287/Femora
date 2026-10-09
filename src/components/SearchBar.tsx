import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        placeholder="Search dresses, sarees, brands..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <TouchableOpacity style={styles.voiceButton}>
        <Text style={styles.icon}>🎤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    height: 50,
    marginVertical: spacing.lg,
    ...shadows.sm,
  },
  icon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    height: '100%',
  },
  voiceButton: {
    padding: spacing.xs,
  },
});