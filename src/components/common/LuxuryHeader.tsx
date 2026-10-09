import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';
import { typography, spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  showBack?: boolean;
}

export const LuxuryHeader = ({ title, showBack = false }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={{ color: colors.textPrimary, fontSize: 24 }}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {showBack && <View style={styles.rightPlaceholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    ...typography.heading2,
    flex: 1,
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: 32, // To balance the back button for centering
  },
});
