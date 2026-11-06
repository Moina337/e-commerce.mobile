
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { CartTabIcon } from '@/components/cart/cart-tab-icon';
import { BrandColors } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BrandColors.copper,
        tabBarInactiveTintColor: BrandColors.charcoal,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },

        tabBarStyle: {
          backgroundColor: BrandColors.stone,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={focused ? BrandColors.copper : BrandColors.charcoal}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="boutique"
        options={{
          title: 'Boutique',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'bag-handle' : 'bag-handle-outline'}
              size={size}
              color={focused ? BrandColors.copper : BrandColors.charcoal}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={focused ? BrandColors.copper : BrandColors.charcoal}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Panier',
          tabBarIcon: ({ focused }) => (
            <CartTabIcon focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
