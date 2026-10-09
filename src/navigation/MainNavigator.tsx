import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import DressDetailsScreen from '../screens/dresses/DressDetailsScreen';
import CheckoutScreen from '../screens/cart/CheckoutScreen';
import OrderDetailsScreen from '../screens/orders/OrderDetailsScreen';
import FashionAssistantScreen from '../screens/ai/FashionAssistantScreen';
import OutfitRecommendationScreen from '../screens/ai/OutfitRecommendationScreen';
import StyleMatchScreen from '../screens/ai/StyleMatchScreen';
import CartScreen from '../screens/cart/CartScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import SearchScreen from '../screens/home/SearchScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import NotificationsScreen from '../screens/profile/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="DressDetails" component={DressDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="FashionAssistant" component={FashionAssistantScreen} />
      <Stack.Screen name="OutfitRecommendation" component={OutfitRecommendationScreen} />
      <Stack.Screen name="StyleMatch" component={StyleMatchScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
