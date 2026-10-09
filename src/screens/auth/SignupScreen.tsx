import React, { useState, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenContainer, LuxuryInput, LuxuryButton } from '../../components/common';
import { useTheme, spacing } from '../../theme';
import { AuthContext } from '../../context/AuthContext';

const SignupScreen = ({ navigation }: any) => {
  const { login } = useContext(AuthContext);
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Form validations
  const validateEmail = (emailStr: string) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(emailStr.trim());
  };

  const handleSignup = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }
    if (!password) {
      Alert.alert('Validation', 'Please create a password');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        await login({ email: email.trim(), name: name.trim() });
        Alert.alert('Success', 'Your account has been successfully created.');
      } catch (err) {
        Alert.alert('Error', 'Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <ScreenContainer style={{ backgroundColor: '#FAF8F4' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centerContainer}>
            {/* Minimal Back Button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            {/* Small Brand Name */}
            <Animated.View entering={FadeInDown.duration(650).springify()}>
              <Text style={styles.brandName}>Femora</Text>
            </Animated.View>

            {/* Title */}
            <Animated.View entering={FadeInDown.delay(50).duration(650).springify()}>
              <Text style={styles.title}>Create Account</Text>
            </Animated.View>

            {/* Form Fields - 18px Input Spacing without external labels */}
            <Animated.View entering={FadeInDown.delay(120).duration(650).springify()} style={styles.formGroup}>
              <LuxuryInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <LuxuryInput
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <LuxuryInput
                placeholder="New Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <LuxuryInput
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </Animated.View>

            {/* Create Account Button - Height 58, Radius 20, marginTop 30 */}
            <Animated.View entering={FadeInDown.delay(200).duration(650).springify()} style={styles.buttonContainer}>
              <LuxuryButton
                title={loading ? 'Creating Account...' : 'Create Account'}
                onPress={handleSignup}
                loading={loading}
                disabled={loading}
              />
            </Animated.View>

            {/* Bottom Text Link - Centered, marginTop 28 */}
            <Animated.View entering={FadeInDown.delay(280).duration(650).springify()} style={styles.footerContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.7}
                disabled={loading}
              >
                <Text style={styles.footerText}>
                  Already have an account?{' '}
                  <Text style={styles.footerLinkBold}>Sign In →</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 90, // Top: 90
    paddingBottom: spacing.xxl,
    backgroundColor: '#FAF8F4',
  },
  centerContainer: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: -50,
    left: 0,
    zIndex: 10,
  },
  backArrow: {
    fontSize: 24,
    color: '#1A1A1A',
    fontWeight: '300',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#B8924A',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 6,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Playfair Display',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 35, // Margin below title: 35
  },
  formGroup: {
    gap: 18, // Between Inputs: 18
  },
  buttonContainer: {
    marginTop: 30, // Button Top: 30
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 28, // Bottom Text: 28
  },
  footerText: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },
  footerLinkBold: {
    fontWeight: '600',
    color: '#B8924A',
  },
});