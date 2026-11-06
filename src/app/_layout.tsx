import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { CartTabIcon } from '@/components/cart/cart-tab-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false,
        headerRight: () => <CartTabIcon />,
       }}>

        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[slug]" options={{ headerShown: true, title: "Détail" }} />
      </Stack>
    </ThemeProvider>
  );
}