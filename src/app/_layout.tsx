import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { CartTabIcon } from '@/components/cart/cart-tab-icon';
import { useAuthStore } from '@/store/authStore';

SplashScreen.preventAutoHideAsync();

function AuthBootstrap() {
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AuthBootstrap />
      <Stack
        screenOptions={{
          headerShown: false,
          headerRight: () => <CartTabIcon />,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="product/[slug]" options={{ headerShown: true, title: 'Détail' }} />
      </Stack>
    </ThemeProvider>
  );
}