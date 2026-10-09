import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import StyleScoreCard from '../../components/StyleScoreCard';
import { colors, spacing, borderRadius, shadows, typography } from '../../theme';

const { width } = Dimensions.get('window');

const StyleMatchScreen = ({ route, navigation }: any) => {
  const { lookType = 'party' } = route.params || {};

  const getMockOutfitData = () => {
    switch (lookType) {
      case 'wedding':
        return {
          title: 'Bridal Radiance Match',
          styleScore: 98,
          colorScore: 92,
          trendScore: 96,
          items: [
            { type: 'Gown', name: 'Ivory Silk Wedding Gown', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300&auto=format&fit=crop' },
            { type: 'Clutch', name: 'Pearl Clutch', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop' }
          ]
        };
      case 'office':
        return {
          title: 'Corporate Executive Match',
          styleScore: 91,
          colorScore: 89,
          trendScore: 90,
          items: [
            { type: 'Blazer', name: 'Structured Beige Blazer', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop' },
            { type: 'Trousers', name: 'Tailored Linen Pants', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300&auto=format&fit=crop' }
          ]
        };
      case 'casual':
        return {
          title: 'Sunday Brunch Match',
          styleScore: 94,
          colorScore: 96,
          trendScore: 88,
          items: [
            { type: 'Midi', name: 'Rose Lace Co-ord Set', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300&auto=format&fit=crop' },
            { type: 'Hat', name: 'Summer Straw Hat', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300&auto=format&fit=crop' }
          ]
        };
      case 'party':
      default:
        return {
          title: 'Cocktail Gala Match',
          styleScore: 95,
          colorScore: 88,
          trendScore: 92,
          items: [
            { type: 'Dress', name: 'Ivory Silk Wrap Dress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=300&auto=format&fit=crop' },
            { type: 'Heels', name: 'Metallic Gold Stilettos', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300&auto=format&fit=crop' }
          ]
        };
    }
  };

  const data = getMockOutfitData();

  return (
    <ScreenContainer scrollable>
      <LuxuryHeader title="Style Match Analyzer" showBack />

      {/* ── Match Title ── */}
      <Animated.View
        entering={FadeInDown.duration(500)}
        style={styles.headerBlock}
      >
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>AI-calculated color, theme and styling harmony</Text>
      </Animated.View>

      {/* ── Visual Match Panel ── */}
      <Animated.View
        entering={FadeInUp.delay(100).duration(600)}
        style={styles.visualPanel}
      >
        <View style={styles.matchItem}>
          <Image source={{ uri: data.items[0].image }} style={styles.itemImage} />
          <Text style={styles.itemTag}>{data.items[0].type}</Text>
          <Text style={styles.itemName} numberOfLines={1}>{data.items[0].name}</Text>
        </View>

        <View style={styles.matchConnector}>
          <Text style={styles.connectorPulse}>✦</Text>
          <View style={styles.connectorLine} />
          <Text style={styles.matchPercentageText}>{data.styleScore}%</Text>
          <View style={styles.connectorLine} />
          <Text style={styles.connectorPulse}>✦</Text>
        </View>

        <View style={styles.matchItem}>
          <Image source={{ uri: data.items[1].image }} style={styles.itemImage} />
          <Text style={styles.itemTag}>{data.items[1].type}</Text>
          <Text style={styles.itemName} numberOfLines={1}>{data.items[1].name}</Text>
        </View>
      </Animated.View>

      {/* ── Score Card ── */}
      <StyleScoreCard
        styleScore={data.styleScore}
        colorScore={data.colorScore}
        trendScore={data.trendScore}
      />

      {/* ── Actions ── */}
      <Animated.View
        entering={FadeInDown.delay(300).duration(500)}
        style={styles.actions}
      >
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('OutfitRecommendation', { lookType, label: data.title })}
          activeOpacity={0.85}
        >
          <Text style={styles.actionBtnText}>Complete the Look ✦</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.footerSpacer} />
    </ScreenContainer>
  );
};

export default StyleMatchScreen;

const styles = StyleSheet.create({
  headerBlock: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C2C2C',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#8A7A68',
    marginTop: 4,
    textAlign: 'center',
  },

  // Visual Panel
  visualPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    marginBottom: spacing.lg,
    ...shadows.soft,
  },
  matchItem: {
    alignItems: 'center',
    width: (width - spacing.xl * 2 - 80) / 2,
  },
  itemImage: {
    width: 90,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#F5F0EA',
  },
  itemTag: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B08D57',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C2C2C',
    textAlign: 'center',
  },

  // Connector
  matchConnector: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  connectorPulse: {
    fontSize: 16,
    color: '#B08D57',
  },
  connectorLine: {
    width: 1,
    height: 24,
    backgroundColor: '#EAE4DC',
    marginVertical: 4,
  },
  matchPercentageText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#B08D57',
    fontFamily: 'serif',
  },

  // Actions
  actions: {
    marginTop: spacing.md,
  },
  actionBtn: {
    backgroundColor: '#B08D57',
    paddingVertical: spacing.lg,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  footerSpacer: {
    height: 40,
  },
});
