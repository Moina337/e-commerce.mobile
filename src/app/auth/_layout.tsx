import { Stack } from 'expo-router';

import { BrandColors, BrandFonts } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Retour',
        headerTintColor: BrandColors.charcoal,
        headerTitleStyle: {
          fontFamily: BrandFonts.display,
          fontSize: 20,
          color: BrandColors.charcoal,
        },
        headerStyle: {
          backgroundColor: BrandColors.stone,
        },
      }}
    />
  );
}
