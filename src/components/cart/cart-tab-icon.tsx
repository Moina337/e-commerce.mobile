import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import { BrandColors } from '@/constants/theme';
import { useCartStore } from '@/store/cartStore';

export function CartTabIcon() {
  const count = useCartStore((state) => state.totalItems);
  const badgeValue = count > 99 ? '99+' : String(count);

  return (
    <View style={styles.container}>
      <SymbolView
        name={{ ios: 'cart.fill', android: 'shopping_cart', web: 'shopping_cart' }}
        size={22}
        tintColor={BrandColors.charcoal}
      />

      {count > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeValue}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -7,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D72638',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: BrandColors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
