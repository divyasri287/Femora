import React, { useState, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenContainer, LuxuryInput, LuxuryButton } from '../../components/common';
import { useTheme, spacing } from '../../theme';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useContext(AuthContext);
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  // Form validations
  const validateEmail = (emailStr: string) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(emailStr.trim());
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation', 'Please enter your password');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      await login({ email: email.trim(), name: 'Fashion User' });
    } catch (e) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = () => {
    if (!forgotEmail.trim()) {
      Alert.alert('Validation', 'Please enter your email address');
      return;
    }
    if (!validateEmail(forgotEmail)) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return;
    }

    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setShowForgotModal(false);
      Alert.alert(
        'Email Sent',
        'Password reset link has been sent to your email.'
      );
      setForgotEmail('');
    }, 1500);
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
            {/* Small Brand Name */}
            <Animated.View entering={FadeInDown.duration(650).springify()}>
              <Text style={styles.brandName}>Femora</Text>
            </Animated.View>

            {/* Title */}
            <Animated.View entering={FadeInDown.delay(50).duration(650).springify()}>
              <Text style={styles.title}>Login</Text>
            </Animated.View>

            {/* Inputs - Filled rounded without external labels */}
            <Animated.View entering={FadeInDown.delay(120).duration(650).springify()} style={styles.formGroup}>
              <LuxuryInput
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <LuxuryInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Forgot Password Link - Right aligned, marginTop 10 */}
              <TouchableOpacity
                onPress={() => setShowForgotModal(true)}
                style={styles.forgotBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Button - Full Width, marginTop 30 */}
            <Animated.View entering={FadeInDown.delay(200).duration(650).springify()} style={styles.buttonContainer}>
              <LuxuryButton
                title={loading ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
              />
            </Animated.View>

            {/* Bottom Text Link - Centered, marginTop 28 */}
            <Animated.View entering={FadeInDown.delay(280).duration(650).springify()} style={styles.footerContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                activeOpacity={0.7}
              >
                <Text style={styles.footerText}>
                  Don't have an account?{' '}
                  <Text style={styles.footerLinkBold}>Sign Up →</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Forgot Password Modal */}
      <Modal
        visible={showForgotModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForgotModal(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setShowForgotModal(false)}
        >
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Forgot Password
            </Text>

            <LuxuryInput
              placeholder="Email Address"
              value={forgotEmail}
              onChangeText={setForgotEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowForgotModal(false)}
              >
                <Text style={styles.modalCancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <LuxuryButton
                title={forgotLoading ? 'Sending...' : 'Send Link'}
                onPress={handleForgotSubmit}
                loading={forgotLoading}
                disabled={forgotLoading}
                style={styles.modalSubmitBtn}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenContainer>
  );
};

export default LoginScreen;

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
  forgotBtn: {
    alignSelf: 'flex-end', // Right aligned
    marginTop: 10, // Forgot Password: 10
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777777',
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

  // Modal styling
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    padding: spacing.xxl,
    backgroundColor: '#FAF8F4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  modalTitle: {
    fontFamily: Platform.select({
      ios: 'Playfair Display',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  modalCancelBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777777',
  },
  modalSubmitBtn: {
    height: 48,
    borderRadius: 16,
    paddingHorizontal: spacing.xl,
    marginVertical: 0,
  },
});