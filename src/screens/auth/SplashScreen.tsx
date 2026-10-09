// ─── SplashScreen ────────────────────────────────────────────────────────────
// Displays while the app boots. After 2s minimum, always navigates to Login.
// If user is already authenticated, RootNavigator shows BottomTabNavigator
// before this screen is ever reached (auth gate in RootNavigator).

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated as RNAnimated,
} from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  const [opacity] = useState(new RNAnimated.Value(0));

  useEffect(() => {
    // Fade in the logo
    RNAnimated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // After 2.2s minimum, navigate to Login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <RNAnimated.View style={{ opacity, alignItems: 'center' }}>
        <Text style={styles.logo}>Femora</Text>
        <Text style={styles.tagline}>Luxury Fashion</Text>
      </RNAnimated.View>

      <View style={styles.loaderWrapper}>
        <ActivityIndicator color="#A88B5D" size="small" />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5F0',
  },
  logo: {
    fontSize: 58,
    fontFamily: 'serif',
    color: '#A88B5D',
    letterSpacing: 6,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 13,
    color: '#C8B08A',
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontWeight: '400',
    marginTop: 8,
  },
  loaderWrapper: {
    position: 'absolute',
    bottom: 60,
  },
});