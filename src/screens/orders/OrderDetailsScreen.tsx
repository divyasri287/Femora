import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing, borderRadius, shadows } from '../../theme';

interface TrackingStep {
  status: string;
  title: string;
  desc: string;
  emoji: string;
}

const TRACKING_STEPS: TrackingStep[] = [
  { status: 'Confirmed', title: 'Order Confirmed', desc: 'We have received your premium order.', emoji: '🧾' },
  { status: 'Packed', title: 'Couture Packed', desc: 'Item inspected & packaged in luxury box.', emoji: '📦' },
  { status: 'Shipped', title: 'In Transit', desc: 'Dispatched via premium express logistics.', emoji: '🚚' },
  { status: 'Out For Delivery', title: 'Out For Delivery', desc: 'Our courier agent is delivering today.', emoji: '🛵' },
  { status: 'Delivered', title: 'Delivered', desc: 'Package hand-delivered successfully.', emoji: '🎁' },
];

const OrderDetailsScreen = ({ route }: any) => {
  const { order } = route.params;
  const { colors } = useTheme();

  // Find the index of the current status in the timeline
  const currentStepIndex = TRACKING_STEPS.findIndex((s) => s.status === order.status);

  return (
    <ScreenContainer scrollable style={styles.noPadding}>
      <StatusBar barStyle="dark-content" />
      <LuxuryHeader title="Track Order" showBack />

      <View style={styles.container}>
        {/* ── Order Basic Details ── */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.metaCard}>
          <Text style={[styles.orderId, { color: colors.textPrimary }]}>Order ID: {order.id}</Text>
          <Text style={styles.orderDate}>Placed on: {order.date}</Text>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Current Status:</Text>
            <Text style={[styles.statusVal, { color: colors.primary }]}>{order.status}</Text>
          </View>
        </Animated.View>

        {/* ── VERTICAL TIMELINE ── */}
        <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.timelineCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Delivery Progress</Text>

          <View style={styles.timelineContainer}>
            {TRACKING_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isLast = idx === TRACKING_STEPS.length - 1;

              return (
                <View key={step.status} style={styles.timelineRow}>
                  {/* Left node icons/lines */}
                  <View style={styles.nodeColumn}>
                    <View
                      style={[
                        styles.dot,
                        isCompleted
                          ? { backgroundColor: colors.primary, borderColor: colors.primary }
                          : { backgroundColor: '#FFFFFF', borderColor: colors.border },
                        isCurrent && { borderWidth: 3, borderColor: '#B08D57', backgroundColor: '#FAF5EC' },
                      ]}
                    >
                      {isCompleted && !isCurrent ? (
                        <Text style={styles.checkText}>✓</Text>
                      ) : (
                        <Text style={styles.dotEmoji}>{step.emoji}</Text>
                      )}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.line,
                          { backgroundColor: idx < currentStepIndex ? colors.primary : colors.border },
                        ]}
                      />
                    )}
                  </View>

                  {/* Right description block */}
                  <View style={styles.textColumn}>
                    <Text
                      style={[
                        styles.stepTitle,
                        { color: isCompleted ? colors.textPrimary : colors.textSecondary },
                        isCurrent && { color: colors.primary, fontWeight: '800' },
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>{step.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* ── ORDER ITEMS SUMMARY ── */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.summaryCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.md }]}>
            Package Contents
          </Text>

          {order.items.map((item: any, idx: number) => (
            <View key={idx} style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemBrand}>{item.brand}</Text>
                <Text style={[styles.itemName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={[styles.itemMeta, { color: colors.textSecondary }]}>
                  Size: {item.selectedSize}  ·  Qty: {item.quantity}
                </Text>
                <Text style={[styles.itemPrice, { color: colors.textPrimary }]}>
                  ₹{(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* ── SHIPPING & RECEIPT ADDRESS ── */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.summaryCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
            Shipping & Receipt
          </Text>
          <Text style={[styles.addressText, { color: colors.textSecondary }]}>{order.address}</Text>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment Mode</Text>
            <Text style={[styles.receiptVal, { color: colors.textPrimary }]}>
              {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
            </Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Total Paid Amount</Text>
            <Text style={[styles.receiptVal, { color: colors.primary, fontWeight: '800' }]}>
              ₹{order.total.toLocaleString()}
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  metaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  orderDate: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusVal: {
    fontSize: 13,
    fontWeight: '800',
  },

  // Timeline
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  timelineContainer: {
    marginTop: spacing.xl,
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 65,
  },
  nodeColumn: {
    alignItems: 'center',
    width: 32,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dotEmoji: {
    fontSize: 10,
  },
  checkText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: -2,
    zIndex: 1,
  },
  textColumn: {
    flex: 1,
    marginLeft: spacing.md,
    paddingBottom: spacing.lg,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  stepDesc: {
    fontSize: 10,
    marginTop: 2,
  },

  // Contents
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  itemImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: '#F0EBE3',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemBrand: {
    fontSize: 8,
    fontWeight: '700',
    color: '#B08D57',
    textTransform: 'uppercase',
  },
  itemName: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'serif',
    marginVertical: 1,
  },
  itemMeta: {
    fontSize: 10,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '800',
  },

  // Address/receipt
  addressText: {
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    height: 0.5,
    marginVertical: spacing.md,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  receiptLabel: {
    fontSize: 12,
    color: '#888',
  },
  receiptVal: {
    fontSize: 12,
    fontWeight: '600',
  },
});
