import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { spacing, borderRadius, shadows } from '../../theme';

const GOLD = '#A88B5D';
const CREAM = '#F8F5F0';
const DARK = '#2D2D2D';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ToggleRowProps {
  icon: string;
  label: string;
  subtitle: string;
  value: boolean;
  onToggle: (val: boolean) => void;
}

interface NavRowProps {
  icon: string;
  label: string;
  subtitle: string;
  onPress: () => void;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const ToggleRow = ({ icon, label, subtitle, value, onToggle }: ToggleRowProps) => (
  <View style={styles.row}>
    <View style={styles.rowIconWrapper}>
      <Text style={styles.rowIcon}>{icon}</Text>
    </View>
    <View style={styles.rowTextBlock}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowSubtitle}>{subtitle}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#E0D8CC', true: GOLD }}
      thumbColor="#FFFFFF"
      ios_backgroundColor="#E0D8CC"
    />
  </View>
);

const NavRow = ({ icon, label, subtitle, onPress }: NavRowProps) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.75}>
    <View style={styles.rowIconWrapper}>
      <Text style={styles.rowIcon}>{icon}</Text>
    </View>
    <View style={styles.rowTextBlock}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowSubtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const SettingsScreen = ({ navigation }: any) => {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailOffers, setEmailOffers] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [savePayment, setSavePayment] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      {/* ── HEADER ── */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── APPEARANCE ── */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.section}>
          <SectionHeader title="Appearance" />
          <View style={styles.card}>
            <ToggleRow
              icon="🌙"
              label="Dark Mode"
              subtitle="Switch to dark theme"
              value={darkMode}
              onToggle={setDarkMode}
            />
          </View>
        </Animated.View>

        {/* ── NOTIFICATIONS ── */}
        <Animated.View entering={FadeInDown.delay(140).duration(400)} style={styles.section}>
          <SectionHeader title="Notifications" />
          <View style={styles.card}>
            <ToggleRow
              icon="🔔"
              label="Push Notifications"
              subtitle="Alerts for orders & updates"
              value={pushNotifs}
              onToggle={setPushNotifs}
            />
            <View style={styles.divider} />
            <ToggleRow
              icon="📧"
              label="Email Offers"
              subtitle="Exclusive deals & lookbooks"
              value={emailOffers}
              onToggle={setEmailOffers}
            />
          </View>
        </Animated.View>

        {/* ── SECURITY ── */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
          <SectionHeader title="Security" />
          <View style={styles.card}>
            <ToggleRow
              icon="👁️"
              label="Biometric Login"
              subtitle="Face ID / Fingerprint"
              value={biometric}
              onToggle={setBiometric}
            />
            <View style={styles.divider} />
            <ToggleRow
              icon="💳"
              label="Save Payment Info"
              subtitle="Faster checkout experience"
              value={savePayment}
              onToggle={setSavePayment}
            />
            <View style={styles.divider} />
            <NavRow
              icon="🔑"
              label="Change Password"
              subtitle="Update your credentials"
              onPress={() => {}}
            />
          </View>
        </Animated.View>

        {/* ── ABOUT ── */}
        <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.section}>
          <SectionHeader title="About" />
          <View style={styles.card}>
            <NavRow
              icon="📄"
              label="Terms & Conditions"
              subtitle="Legal agreements"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <NavRow
              icon="🔒"
              label="Privacy Policy"
              subtitle="How we use your data"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <NavRow
              icon="⭐"
              label="Rate Femora"
              subtitle="Share your experience"
              onPress={() => {}}
            />
          </View>
        </Animated.View>

        {/* ── VERSION ── */}
        <Animated.View entering={FadeInUp.delay(320).duration(400)} style={styles.versionSection}>
          <View style={styles.goldDot} />
          <Text style={styles.versionText}>Femora v2.0 · Luxury Fashion</Text>
          <View style={styles.goldDot} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : spacing.xl + 24,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: CREAM,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EAE0',
    ...shadows.soft,
  },
  backIcon: {
    fontSize: 26,
    color: DARK,
    fontWeight: '300',
    lineHeight: 30,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'serif',
    color: DARK,
    letterSpacing: 0.3,
  },

  // Section
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#AAA',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0EAE0',
    ...shadows.soft,
  },
  divider: {
    height: 1,
    backgroundColor: '#F8F4EE',
    marginLeft: 62,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    gap: spacing.md,
  },
  rowIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FAF5EC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE3CE',
  },
  rowIcon: {
    fontSize: 16,
  },
  rowTextBlock: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK,
    letterSpacing: 0.2,
  },
  rowSubtitle: {
    fontSize: 11,
    color: '#AAA',
    fontWeight: '400',
  },
  chevron: {
    fontSize: 22,
    color: '#CCC',
    fontWeight: '300',
  },

  // Version
  versionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxl,
  },
  versionText: {
    fontSize: 11,
    color: '#BBB',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  goldDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
    opacity: 0.5,
  },
});
