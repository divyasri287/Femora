const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'src', 'screens');

// Template for basic screens
const getTemplate = (title) => `import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import { useTheme, typography, spacing } from '../../theme';

const ${title.replace(/\s+/g, '')}Screen = () => {
  const { colors } = useTheme();
  
  return (
    <ScreenContainer>
      <LuxuryHeader title="${title}" showBack />
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        ${title} Collection 🌸
      </Text>
    </ScreenContainer>
  );
};

export default ${title.replace(/\s+/g, '')}Screen;

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
`;

// Basic placeholder screens to overwrite
const screensToOverwrite = [
  { path: 'dresses/CasualScreen.tsx', title: 'Casual' },
  { path: 'dresses/PartyWearScreen.tsx', title: 'Party Wear' },
  { path: 'dresses/SummerCollectionScreen.tsx', title: 'Summer Collection' },
  { path: 'dresses/WeddingScreen.tsx', title: 'Wedding' },
  { path: 'dresses/TrendingScreen.tsx', title: 'Trending' },
  { path: 'home/CollectionsScreen.tsx', title: 'Collections' },
  { path: 'home/SearchScreen.tsx', title: 'Search' },
  { path: 'orders/OrderDetailsScreen.tsx', title: 'Order Details' },
  { path: 'orders/OrdersScreen.tsx', title: 'Orders' },
  { path: 'profile/EditProfileScreen.tsx', title: 'Edit Profile' },
  { path: 'profile/ProfileScreen.tsx', title: 'Profile' },
  { path: 'wishlist/WishlistScreen.tsx', title: 'Wishlist' },
];

screensToOverwrite.forEach((s) => {
  fs.writeFileSync(path.join(screensDir, s.path), getTemplate(s.title));
  console.log('Updated ' + s.path);
});
