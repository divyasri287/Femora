import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
  TextInput,
  Alert,
  StatusBar,
  FlatList,
  ImageStyle,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader, ShimmerLoader, LuxuryButton } from '../../components/common';
import AIRecommendationCard from '../../components/AIRecommendationCard';
import LuxuryProductCard from '../../components/LuxuryProductCard';
import { colors, spacing, borderRadius, shadows, typography, useTheme } from '../../theme';
import { trendingProducts, bestSellers } from '../../data/homeData';

const { width } = Dimensions.get('window');
const LOOK_CARD_WIDTH = (width - spacing.lg * 2 - spacing.md * 2) / 3;

interface LookOption {
  id: string;
  emoji: string;
  label: string;
  lookType: string;
}

const OCCASIONS: LookOption[] = [
  { id: '1', emoji: '👰', label: 'Wedding', lookType: 'wedding' },
  { id: '2', emoji: '🎉', label: 'Party', lookType: 'party' },
  { id: '3', emoji: '🏢', label: 'Office', lookType: 'office' },
  { id: '4', emoji: '🌸', label: 'Casual', lookType: 'casual' },
  { id: '5', emoji: '🎓', label: 'College', lookType: 'college' },
  { id: '6', emoji: '💎', label: 'Luxury', lookType: 'luxury' },
];

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const FABRICS = ['Silk', 'Velvet', 'Linen', 'Satin', 'Chiffon', 'Lace'];

const AIStylistScreen = ({ navigation }: any) => {
  const { colors: themeColors } = useTheme();

  // Form states
  const [selectedOccasion, setSelectedOccasion] = useState('wedding');
  const [selectedSeason, setSelectedSeason] = useState('Summer');
  const [selectedFabric, setSelectedFabric] = useState('Silk');
  const [colorPref, setColorPref] = useState('Ivory & Gold');

  // Image uploader simulation state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Recommendations scan state
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);

  const handleOccasionSelect = (look: LookOption) => {
    setSelectedOccasion(look.lookType);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // Set a mock uploaded outfit image URL
      setUploadedImage(
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop'
      );
      Alert.alert('Upload Success', 'Your outfit photograph was uploaded successfully!');
    }, 1200);
  };

  const handleScanOutfit = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate luxury AI backend compute
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        score: Math.floor(88 + Math.random() * 11), // 88% - 99%
        feedback: `This outfit coordinates beautifully for a ${selectedOccasion} look in the ${selectedSeason}. The drape of ${selectedFabric} fabric pairs perfectly with your color preference of '${colorPref}'.`,
        picks: [...trendingProducts, ...bestSellers].slice(0, 3),
      });
    }, 2200);
  };

  const handleResetScan = () => {
    setUploadedImage(null);
    setScanResult(null);
  };

  return (
    <ScreenContainer scrollable>
      <StatusBar barStyle="dark-content" />
      <LuxuryHeader title="AI Stylist" />

      {/* ── Welcome Banner ── */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.welcomeCard}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop' }}
          style={styles.welcomeBg}
          imageStyle={styles.welcomeImage as ImageStyle}
        >
          <View style={styles.welcomeOverlay} />
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTextSmall}>✦ Femora Intelligent Styling</Text>
            <Text style={styles.welcomeTextLarge}>Your Personal AI Stylist</Text>
            <Text style={styles.welcomeSubtitle}>
              Get personalized fashion recommendations tailored for you
            </Text>
            <TouchableOpacity
              style={styles.chatBtn}
              onPress={() => navigation.navigate('FashionAssistant')}
              activeOpacity={0.85}
            >
              <Text style={styles.chatBtnText}>Chat with Stylist ✨</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* ── AI STYLIST INTERACTIVE FORM ── */}
      <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.formCard}>
        <Text style={styles.formTitle}>Outfit Personalization</Text>
        <View style={styles.goldDivider} />

        {/* 1. Occasions Grid */}
        <Text style={styles.fieldLabel}>1. Select Occasion</Text>
        <View style={styles.grid}>
          {OCCASIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.lookCard,
                selectedOccasion === item.lookType && styles.lookCardActive,
              ]}
              onPress={() => handleOccasionSelect(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.lookEmoji}>{item.emoji}</Text>
              <Text
                style={[
                  styles.lookLabel,
                  selectedOccasion === item.lookType && styles.lookLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2. Season Selector */}
        <Text style={styles.fieldLabel}>2. Season Preference</Text>
        <View style={styles.optionsRow}>
          {SEASONS.map((season) => (
            <TouchableOpacity
              key={season}
              style={[
                styles.optionChip,
                selectedSeason === season && styles.optionChipActive,
              ]}
              onPress={() => setSelectedSeason(season)}
            >
              <Text
                style={[
                  styles.optionChipText,
                  selectedSeason === season && styles.optionChipTextActive,
                ]}
              >
                {season}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. Fabric Selector */}
        <Text style={styles.fieldLabel}>3. Fabric Preference</Text>
        <View style={styles.optionsRow}>
          {FABRICS.map((fabric) => (
            <TouchableOpacity
              key={fabric}
              style={[
                styles.optionChip,
                selectedFabric === fabric && styles.optionChipActive,
              ]}
              onPress={() => setSelectedFabric(fabric)}
            >
              <Text
                style={[
                  styles.optionChipText,
                  selectedFabric === fabric && styles.optionChipTextActive,
                ]}
              >
                {fabric}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Color Preference */}
        <Text style={styles.fieldLabel}>4. Color Preference</Text>
        <TextInput
          style={[styles.textInput, { borderColor: themeColors.border, color: themeColors.textPrimary }]}
          placeholder="e.g. Pastel Green, Emerald, Crimson Red"
          placeholderTextColor="#B8A898"
          value={colorPref}
          onChangeText={setColorPref}
        />

        {/* 5. Outfit Image Uploader */}
        <Text style={styles.fieldLabel}>5. Reference Outfit Photograph (Optional)</Text>
        <View style={styles.uploaderContainer}>
          {isUploading ? (
            <ShimmerLoader height={100} style={styles.uploadShimmer} />
          ) : uploadedImage ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: uploadedImage }} style={styles.previewImg as ImageStyle} />
              <TouchableOpacity style={styles.removeUploadBtn} onPress={() => setUploadedImage(null)}>
                <Text style={{ color: '#FFF', fontWeight: '800', fontSize: 10 }}>Remove ✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.uploadBox, { borderColor: themeColors.border }]}
              onPress={handleSimulateUpload}
              activeOpacity={0.8}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={[styles.uploadText, { color: themeColors.textSecondary }]}>
                Upload Outfit Photo
              </Text>
              <Text style={styles.uploadSubtext}>JPG, PNG up to 10MB</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Scan Trigger Button */}
        <LuxuryButton
          title={isScanning ? 'AI Engine Computing...' : 'Generate AI Styling Recommendations'}
          onPress={handleScanOutfit}
          disabled={isScanning || isUploading}
          style={styles.scanBtn}
        />
      </Animated.View>

      {/* ── SHIMMER SCANNING OVERLAY ── */}
      {isScanning && (
        <Animated.View entering={FadeInDown.duration(400)} style={styles.scanningContainer}>
          <Text style={styles.scanningTitle}>Analyzing Couture Compatibility... ⏳</Text>
          <ShimmerLoader height={24} style={styles.scanBar} />
          <ShimmerLoader height={14} style={styles.scanBarSmall} />
        </Animated.View>
      )}

      {/* ── STYLE MATCH SCORE AND RECOMMENDED CARDS RESULT ── */}
      {scanResult && (
        <Animated.View entering={FadeInUp.duration(500)} style={styles.resultSection}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultHeaderTitle}>AI Styling Diagnosis</Text>
            <TouchableOpacity onPress={handleResetScan}>
              <Text style={[styles.resetScanText, { color: themeColors.primary }]}>Reset Analysis</Text>
            </TouchableOpacity>
          </View>

          {/* Style Match Score Card */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{scanResult.score}%</Text>
              <Text style={styles.scoreSub}>Match Score</Text>
            </View>
            <View style={styles.scoreFeedback}>
              <Text style={[styles.feedbackTitle, { color: themeColors.textPrimary }]}>Styling Feedback</Text>
              <Text style={[styles.feedbackText, { color: themeColors.textSecondary }]}>
                {scanResult.feedback}
              </Text>
            </View>
          </View>

          {/* Recommended Cards Carousel */}
          <Text style={styles.picksTitle}>Curated Couture Recommendations</Text>
          <FlatList
            horizontal
            data={scanResult.picks}
            keyExtractor={(item: any) => 'ai-pick-' + item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.picksList}
            renderItem={({ item, index }: { item: any; index: number }) => (
              <LuxuryProductCard
                item={item}
                index={index}
                onPress={() => navigation.navigate('DressDetails', { item })}
              />
            )}
          />
        </Animated.View>
      )}

      <View style={styles.footerSpacer} />
    </ScreenContainer>
  );
};

export default AIStylistScreen;

const styles = StyleSheet.create({
  welcomeCard: {
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    ...shadows.medium,
  },
  welcomeBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  welcomeImage: {
    resizeMode: 'cover',
  },
  welcomeOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(44, 44, 44, 0.45)',
  },
  welcomeContent: {
    padding: spacing.xl,
    justifyContent: 'center',
  },
  welcomeTextSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EAE4DC',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  welcomeTextLarge: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
    marginBottom: spacing.md,
    maxWidth: '85%',
  },
  chatBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#B08D57',
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: borderRadius.round,
  },
  chatBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Form Card
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
    marginBottom: spacing.xl,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'serif',
    color: '#2C2C2C',
  },
  goldDivider: {
    width: 40,
    height: 2.5,
    backgroundColor: '#B08D57',
    marginVertical: spacing.md,
    borderRadius: 1,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B08D57',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  lookCard: {
    width: LOOK_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    ...shadows.soft,
  },
  lookCardActive: {
    borderColor: '#B08D57',
    backgroundColor: '#FAF5EC',
  },
  lookEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  lookLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  lookLabelActive: {
    color: '#B08D57',
    fontWeight: '800',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  optionChip: {
    borderWidth: 1,
    borderColor: '#EDE8E0',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  optionChipActive: {
    backgroundColor: '#B08D57',
    borderColor: '#B08D57',
  },
  optionChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555',
  },
  optionChipTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: 46,
    paddingHorizontal: spacing.md,
    fontSize: 13,
    backgroundColor: '#FAF7F2',
    marginBottom: spacing.md,
  },

  // Uploader
  uploaderContainer: {
    marginVertical: spacing.xs,
    alignItems: 'center',
    width: '100%',
  },
  uploadShimmer: {
    width: '100%',
    borderRadius: 16,
  },
  previewContainer: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAE4DC',
  },
  previewImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeUploadBtn: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(194,91,86,0.95)',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 8,
  },
  uploadBox: {
    width: '100%',
    height: 100,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  uploadIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '700',
  },
  uploadSubtext: {
    fontSize: 9,
    color: '#AAA',
    marginTop: 2,
  },
  scanBtn: {
    marginTop: spacing.xl,
    marginVertical: 0,
  },

  // Shimmer analysis
  scanningContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.soft,
  },
  scanningTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B08D57',
    marginBottom: spacing.md,
  },
  scanBar: {
    width: '90%',
    marginBottom: spacing.sm,
  },
  scanBarSmall: {
    width: '60%',
  },

  // Results styling
  resultSection: {
    marginBottom: spacing.xl,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  resultHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'serif',
    color: '#2C2C2C',
  },
  resetScanText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.soft,
  },
  scoreCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#5E8C61', // Green matching score
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF7EF',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#5E8C61',
    fontFamily: 'serif',
  },
  scoreSub: {
    fontSize: 8,
    color: '#5E8C61',
    fontWeight: '600',
    marginTop: 1,
  },
  scoreFeedback: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 11,
    lineHeight: 16,
  },
  picksTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'serif',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  picksList: {
    paddingBottom: spacing.sm,
  },
  footerSpacer: {
    height: 90,
  },
});
