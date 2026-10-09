// ─── RootNavigator ───────────────────────────────────────────────────────────
// Switches between AuthNavigator and MainNavigator based on auth state.
// No loading spinner here — SplashScreen inside AuthNavigator handles that.

import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // While restoring session, show a minimal loader so there's no flash.
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#A88B5D" />
      </View>
    );
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5F0',
  },
});