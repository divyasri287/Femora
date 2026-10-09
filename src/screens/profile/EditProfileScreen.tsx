import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing } from '../../theme';

const EditProfileScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ScreenContainer>
      <LuxuryHeader title="Edit Profile" showBack />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Edit Profile Collection 🌸
      </Text>
    </ScreenContainer>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
