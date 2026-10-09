import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader, LuxuryButton, EmptyState } from '../../components/common';
import { useTheme, typography, spacing, borderRadius, shadows } from '../../theme';
import { CartContext } from '../../context/CartContext';

const CartScreen = ({ navigation }: any) => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const { colors } = useTheme();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Computations
  const subtotal = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === 'FEMORA20') {
      return Math.round(subtotal * 0.2); // 20% off
    }
    if (appliedCoupon === 'WELCOME') {
      return subtotal > 1500 ? 500 : 0; // Flat 500 off for orders above 1500
    }
    return 0;
  };

  const discount = getDiscountAmount();
  const deliveryCharge = subtotal > 0 && subtotal < 4999 ? 150 : 0;
  const grandTotal = Math.max(subtotal - discount + deliveryCharge, 0);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'FEMORA20') {
      setAppliedCoupon('FEMORA20');
      Alert.alert('Coupon Applied', 'Luxury 20% discount applied to your bag!');
    } else if (code === 'WELCOME') {
      if (subtotal < 1500) {
        Alert.alert('Coupon Error', 'WELCOME coupon requires a minimum purchase of ₹1,500.');
        return;
      }
      setAppliedCoupon('WELCOME');
      Alert.alert('Coupon Applied', 'WELCOME Flat ₹500 discount applied to your bag!');
    } else {
      Alert.alert('Invalid Coupon', 'The coupon code you entered is invalid or expired.');
    }
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    Alert.alert('Coupon Removed', 'Coupon discount has been removed.');
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout', {
      subtotal,
      discount,
      deliveryCharge,
      grandTotal,
      appliedCoupon,
    });
  };

  if (cart.length === 0) {
    return (
      <EmptyState
        emoji="🛒"
        title="Your Shopping Bag is Empty"
        message="Discover our luxury collections and select the fine silhouettes crafted for your distinguished style."
        buttonText="Explore Couture"
        onButtonPress={() => navigation.navigate('Home')}
      />
    );
  }

  return (
    <ScreenContainer style={styles.noPadding}>
      <StatusBar barStyle="dark-content" />
      <LuxuryHeader title="Shopping Bag" />

      {/* Cart Items List */}
      <FlatList
        data={cart}
        keyExtractor={(item: any) => item.cartItemId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.delay(index * 80).duration(400)}
            style={styles.cartCard}
          >
            {/* Product image */}
            <Image source={{ uri: item.image }} style={styles.productImg} />

            {/* Product details */}
            <View style={styles.productDetails}>
              <Text style={styles.productBrand}>{item.brand}</Text>
              <Text style={[styles.productName, { color: colors.textPrimary }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.productMeta, { color: colors.textSecondary }]}>
                Size: {item.selectedSize}  ·  Color: {item.selectedColor}
              </Text>

              {/* Price row */}
              <View style={styles.priceRow}>
                <Text style={[styles.productPrice, { color: colors.textPrimary }]}>
                  ₹{item.price.toLocaleString()}
                </Text>
                {item.originalPrice > item.price && (
                  <Text style={styles.productOriginalPrice}>
                    ₹{item.originalPrice.toLocaleString()}
                  </Text>
                )}
              </View>

              {/* Action buttons (Quantity + Remove) */}
              <View style={styles.actionsRow}>
                <View style={[styles.quantitySelector, { borderColor: colors.border }]}>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  >
                    <Text style={[styles.quantityBtnText, { color: colors.textPrimary }]}>-</Text>
                  </TouchableOpacity>
                  <Text style={[styles.quantityVal, { color: colors.textPrimary }]}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  >
                    <Text style={[styles.quantityBtnText, { color: colors.textPrimary }]}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Delete */}
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => removeFromCart(item.cartItemId)}
                >
                  <Text style={styles.deleteBtnText}>🗑️ Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      />

      {/* ── Summary & Coupon Panel ── */}
      <Animated.View entering={FadeInDown.duration(500)} style={styles.footerPanel}>
        {/* Coupon Code Input */}
        <View style={[styles.couponContainer, { borderColor: colors.border }]}>
          {appliedCoupon ? (
            <View style={styles.couponAppliedRow}>
              <Text style={styles.couponAppliedText}>
                🎟️ Coupon <Text style={styles.couponBold}>{appliedCoupon}</Text> Applied
              </Text>
              <TouchableOpacity onPress={handleRemoveCoupon}>
                <Text style={styles.removeCouponBtn}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TextInput
                style={[styles.couponInput, { color: colors.textPrimary }]}
                placeholder="Enter promo code (FEMORA20, WELCOME)"
                placeholderTextColor="#B8A898"
                value={couponCode}
                onChangeText={setCouponCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={[styles.couponApplyBtn, { backgroundColor: colors.primary }]}
                onPress={handleApplyCoupon}
              >
                <Text style={{ color: '#FFF', fontWeight: '800', fontSize: 11 }}>Apply</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Pricing Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Bag Subtotal</Text>
            <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
              ₹{subtotal.toLocaleString()}
            </Text>
          </View>

          {appliedCoupon ? (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Coupon Discount</Text>
              <Text style={[styles.summaryValue, { color: colors.success }]}>
                - ₹{discount.toLocaleString()}
              </Text>
            </View>
          ) : null}

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Delivery Charges</Text>
            <Text style={[styles.summaryValue, { color: deliveryCharge === 0 ? colors.success : colors.textPrimary }]}>
              {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
            </Text>
          </View>

          <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Grand Total</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              ₹{grandTotal.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Checkout Button */}
        <LuxuryButton
          title="Proceed to Secure Checkout"
          onPress={handleCheckout}
          style={styles.checkoutBtn}
        />
      </Animated.View>
    </ScreenContainer>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 260, // Clear footer panel height
    gap: spacing.md,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
    gap: spacing.md,
  },
  productImg: {
    width: 90,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    backgroundColor: '#F0EBE3',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productBrand: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B08D57',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  productName: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'serif',
    marginTop: 2,
    marginBottom: 4,
  },
  productMeta: {
    fontSize: 11,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  productOriginalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#FAF5EC',
  },
  quantityBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
  quantityVal: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  deleteBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  deleteBtnText: {
    fontSize: 11,
    color: '#C25B56',
    fontWeight: '600',
  },

  // Footer Panel
  footerPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#EDE8E0',
    ...shadows.lg,
  },
  couponContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    marginBottom: spacing.md,
  },
  couponInput: {
    flex: 1,
    fontSize: 12,
    padding: 0,
    fontWeight: '500',
  },
  couponApplyBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderRadius: 8,
  },
  couponAppliedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponAppliedText: {
    fontSize: 12,
    color: '#2C2C2C',
    fontWeight: '500',
  },
  couponBold: {
    fontWeight: '800',
    color: '#B08D57',
  },
  removeCouponBtn: {
    fontSize: 12,
    color: '#C25B56',
    fontWeight: '700',
  },
  summaryCard: {
    gap: 6,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  summaryDivider: {
    height: 0.5,
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  checkoutBtn: {
    marginVertical: 0,
  },
});