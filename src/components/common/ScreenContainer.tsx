import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../../theme';
import { spacing } from '../../theme';

interface Props extends ViewProps {
  scrollable?: boolean;
}

export const ScreenContainer = ({ children, scrollable = false, style, ...props }: Props) => {
  const { colors } = useTheme();

  const content = scrollable ? (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }, style]} {...props}>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
});
