import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader, EmptyState } from '../../components/common';
import { useTheme, typography, spacing, borderRadius, shadows } from '../../theme';
import { OrdersContext } from '../../context/OrdersContext';

const OrdersScreen = ({ navigation }: any) => {
  const { orders } = useContext(OrdersContext);
  const { colors } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#B08D57'; // Gold
      case 'Packed': return '#E0A800'; // Yellow
      case 'Shipped': return '#0275d8'; // Blue
      case 'Out For Delivery': return '#f0ad4e'; // Orange
      case 'Delivered': return colors.success; // Green
      default: return colors.textSecondary;
    }
  };

  const handleOrderPress = (order: any) => {
    navigation.navigate('OrderDetails', { order });
  };

  if (orders.length === 0) {
    return (
      <EmptyState
        emoji="📦"
        title="No Orders Placed Yet"
        message="You have not placed any couture orders yet. Discover our premium arrivals and place your first order today."
        buttonText="Shop New Arrivals"
        onButtonPress={() => navigation.navigate('Home')}
      />
    );
  }

  return (
    <ScreenContainer style={styles.noPadding}>
      <StatusBar barStyle="dark-content" />
      <LuxuryHeader title="My Orders" showBack />

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.delay(index * 80).duration(400)}
            style={styles.orderCard}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleOrderPress(item)}
              style={styles.cardContainer}
            >
              {/* Order Info Row */}
              <View style={styles.headerRow}>
                <View>
                  <Text style={[styles.orderId, { color: colors.textPrimary }]}>Order ID: {item.id}</Text>
                  <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                {/* Status Badge */}
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) + '15', borderColor: getStatusColor(item.status) },
                  ]}
                >
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Items Summary */}
              <View style={styles.itemsSummary}>
                <Text style={[styles.itemSummaryText, { color: colors.textSecondary }]}>
                  {item.items.length === 1 ? '1 Luxury Item' : `${item.items.length} Luxury Items`} : {item.items.map((i) => i.name).join(', ')}
                </Text>
              </View>

              {/* Price and Action Row */}
              <View style={styles.footerRow}>
                <View>
                  <Text style={styles.totalLabel}>Total Price</Text>
                  <Text style={[styles.totalAmount, { color: colors.primary }]}>₹{item.total.toLocaleString()}</Text>
                </View>

                <View style={[styles.trackBtn, { backgroundColor: colors.secondary }]}>
                  <Text style={[styles.trackBtnText, { color: colors.primary }]}>Track Order →</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </ScreenContainer>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  cardContainer: {
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  orderDate: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  divider: {
    height: 0.5,
    marginVertical: spacing.md,
  },
  itemsSummary: {
    marginBottom: spacing.md,
  },
  itemSummaryText: {
    fontSize: 12,
    lineHeight: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 10,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  trackBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 12,
  },
  trackBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
