import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader, LuxuryButton } from '../../components/common';
import { useTheme, typography, spacing, borderRadius, shadows } from '../../theme';
import { CartContext } from '../../context/CartContext';
import { OrdersContext } from '../../context/OrdersContext';

const CheckoutScreen = ({ route, navigation }: any) => {
  const { colors } = useTheme();
  const { cart, clearCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrdersContext);

  // Retrieve pricing calculated in Cart
  const { subtotal, discount, deliveryCharge, grandTotal, appliedCoupon } = route.params || {
    subtotal: cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    discount: 0,
    deliveryCharge: 0,
    grandTotal: cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    appliedCoupon: null,
  };

  // State details
  const [address, setAddress] = useState('12, Luxury Boulevard, Suite 5B, New Delhi - 110001');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState<'Standard' | 'Express'>('Standard');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');

  // Payment Form details
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [loading, setLoading] = useState(false);

  const finalDeliveryCharge = deliveryMethod === 'Express' ? 250 : deliveryCharge;
  const finalGrandTotal = grandTotal + (deliveryMethod === 'Express' ? 250 - deliveryCharge : 0);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      Alert.alert('Validation', 'Please enter a shipping address.');
      return;
    }

    if (paymentMethod === 'UPI' && !upiId.trim()) {
      Alert.alert('Validation', 'Please enter your UPI ID.');
      return;
    }

    if (paymentMethod === 'Card') {
      if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        Alert.alert('Validation', 'Please complete your credit card information.');
        return;
      }
    }

    try {
      setLoading(true);

      // Map cart items to order items
      const orderItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }));

      // Place order in context
      const generatedOrder = await placeOrder(
        orderItems,
        address,
        deliveryMethod,
        paymentMethod,
        finalGrandTotal
      );

      // Clear shopping cart
      await clearCart();

      setTimeout(() => {
        setLoading(false);
        // Navigate to tracking screen
        navigation.navigate('OrderDetails', { order: generatedOrder });
      }, 1500);
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Failed to place your order. Please try again.');
    }
  };

  const handleSaveAddress = () => {
    if (newAddress.trim()) {
      setAddress(newAddress.trim());
      setIsEditingAddress(false);
    } else {
      Alert.alert('Validation', 'Address cannot be empty.');
    }
  };

  return (
    <ScreenContainer scrollable style={styles.noPadding}>
      <StatusBar barStyle="dark-content" />
      <LuxuryHeader title="Checkout" showBack />

      <View style={styles.container}>
        {/* ── SHIPPING ADDRESS ── */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Shipping Address</Text>
            <TouchableOpacity onPress={() => setIsEditingAddress(!isEditingAddress)}>
              <Text style={[styles.actionLink, { color: colors.primary }]}>
                {isEditingAddress ? 'Cancel' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>

          {isEditingAddress ? (
            <View style={styles.editAddressContainer}>
              <TextInput
                style={[styles.addressInput, { borderColor: colors.border, color: colors.textPrimary }]}
                multiline
                placeholder="Enter your shipping address"
                value={newAddress || address}
                onChangeText={setNewAddress}
              />
              <TouchableOpacity
                style={[styles.saveAddressBtn, { backgroundColor: colors.primary }]}
                onPress={handleSaveAddress}
              >
                <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 12 }}>Save Address</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={[styles.addressText, { color: colors.textSecondary }]}>{address}</Text>
          )}
        </Animated.View>

        {/* ── DELIVERY METHOD ── */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.md }]}>
            Delivery Method
          </Text>

          <TouchableOpacity
            style={[
              styles.methodOption,
              { borderColor: colors.border },
              deliveryMethod === 'Standard' && { borderColor: colors.primary },
            ]}
            onPress={() => setDeliveryMethod('Standard')}
          >
            <View style={styles.methodInfo}>
              <Text style={[styles.methodLabel, { color: colors.textPrimary }]}>Standard Delivery</Text>
              <Text style={[styles.methodDesc, { color: colors.textSecondary }]}>3 - 5 business days</Text>
            </View>
            <Text style={[styles.methodPrice, { color: colors.success }]}>FREE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodOption,
              { borderColor: colors.border },
              deliveryMethod === 'Express' && { borderColor: colors.primary },
            ]}
            onPress={() => setDeliveryMethod('Express')}
          >
            <View style={styles.methodInfo}>
              <Text style={[styles.methodLabel, { color: colors.textPrimary }]}>Express Delivery</Text>
              <Text style={[styles.methodDesc, { color: colors.textSecondary }]}>Next business day</Text>
            </View>
            <Text style={[styles.methodPrice, { color: colors.textPrimary }]}>₹250</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── PAYMENT METHOD ── */}
        <Animated.View entering={FadeInUp.delay(180).duration(400)} style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.md }]}>
            Payment Method
          </Text>

          {/* Payment Tabs */}
          <View style={styles.paymentTabs}>
            {['UPI', 'Card', 'COD'].map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.paymentTab,
                  { borderColor: colors.border },
                  paymentMethod === method && { backgroundColor: colors.primary, borderColor: colors.primary },
                ]}
                onPress={() => setPaymentMethod(method as any)}
              >
                <Text
                  style={[
                    styles.paymentTabText,
                    { color: paymentMethod === method ? colors.white : colors.textPrimary },
                  ]}
                >
                  {method === 'COD' ? 'Cash on Delivery' : method === 'Card' ? 'Credit Card' : 'UPI Payment'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dynamic Payment Forms */}
          {paymentMethod === 'UPI' && (
            <View style={styles.paymentForm}>
              <Text style={[styles.formLabel, { color: colors.textPrimary }]}>UPI ID</Text>
              <TextInput
                style={[styles.formInput, { borderColor: colors.border, color: colors.textPrimary }]}
                placeholder="e.g. name@upi"
                placeholderTextColor="#B8A898"
                value={upiId}
                onChangeText={setUpiId}
                autoCapitalize="none"
              />
            </View>
          )}

          {paymentMethod === 'Card' && (
            <View style={styles.paymentForm}>
              <Text style={[styles.formLabel, { color: colors.textPrimary }]}>Card Number</Text>
              <TextInput
                style={[styles.formInput, { borderColor: colors.border, color: colors.textPrimary }]}
                placeholder="1234 5678 9101 1121"
                placeholderTextColor="#B8A898"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
              <View style={styles.formRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.formLabel, { color: colors.textPrimary }]}>Expiry Date</Text>
                  <TextInput
                    style={[styles.formInput, { borderColor: colors.border, color: colors.textPrimary }]}
                    placeholder="MM/YY"
                    placeholderTextColor="#B8A898"
                    value={expiry}
                    onChangeText={setExpiry}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={[styles.formLabel, { color: colors.textPrimary }]}>CVV</Text>
                  <TextInput
                    style={[styles.formInput, { borderColor: colors.border, color: colors.textPrimary }]}
                    placeholder="123"
                    placeholderTextColor="#B8A898"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={3}
                    value={cvv}
                    onChangeText={setCvv}
                  />
                </View>
              </View>
            </View>
          )}

          {paymentMethod === 'COD' && (
            <View style={styles.paymentForm}>
              <Text style={[styles.codText, { color: colors.textSecondary }]}>
                💵 Pay with cash upon delivery. A verification pin will be sent to your registered phone number.
              </Text>
            </View>
          )}
        </Animated.View>

        {/* ── ORDER SUMMARY CARD ── */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.summaryCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: spacing.md }]}>
            Order Summary
          </Text>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Item Subtotal</Text>
            <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>₹{subtotal.toLocaleString()}</Text>
          </View>

          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Promo Discount</Text>
              <Text style={[styles.summaryValue, { color: colors.success }]}>- ₹{discount.toLocaleString()}</Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Delivery Charge</Text>
            <Text style={[styles.summaryValue, { color: finalDeliveryCharge === 0 ? colors.success : colors.textPrimary }]}>
              {finalDeliveryCharge === 0 ? 'FREE' : `₹${finalDeliveryCharge}`}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Total Amount</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>₹{finalGrandTotal.toLocaleString()}</Text>
          </View>
        </Animated.View>

        {/* Place Order Action */}
        <LuxuryButton
          title={loading ? 'Processing Transaction...' : 'Place Secure Order'}
          onPress={handlePlaceOrder}
          loading={loading}
          disabled={loading}
          style={styles.placeBtn}
        />
      </View>
    </ScreenContainer>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  actionLink: {
    fontSize: 12,
    fontWeight: '700',
  },
  addressText: {
    fontSize: 13,
    lineHeight: 18,
  },
  editAddressContainer: {
    gap: spacing.sm,
  },
  addressInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 13,
    height: 60,
    textAlignVertical: 'top',
  },
  saveAddressBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  methodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: '#FAF7F2',
  },
  methodInfo: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  methodDesc: {
    fontSize: 10,
    marginTop: 2,
  },
  methodPrice: {
    fontSize: 13,
    fontWeight: '800',
  },

  // Payment tabs
  paymentTabs: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  paymentTab: {
    flex: 1,
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  paymentTabText: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Payment Form
  paymentForm: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    height: 44,
    fontSize: 13,
  },
  formRow: {
    flexDirection: 'row',
  },
  codText: {
    fontSize: 12,
    lineHeight: 18,
  },

  // Summary
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    ...shadows.soft,
    gap: 6,
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
  divider: {
    height: 0.5,
    marginVertical: spacing.sm,
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
  placeBtn: {
    marginVertical: spacing.md,
  },
});