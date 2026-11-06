import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Utilisation de Ionicons

import { BrandColors } from '@/constants/theme';
import { useCartStore } from '@/store/cartStore';

interface CartTabIconProps {
  focused?: boolean; // Permet de savoir si l'onglet est actif ou non
}

export function CartTabIcon({ focused }: CartTabIconProps) {
  // Récupération de votre état global totalItems
  const count = useCartStore((state) => state.totalItems);
  const badgeValue = count > 99 ? '99+' : String(count);

  return (
    <View style={styles.container}>
      {/* Remplacement de SymbolView par Ionicons */}
      <Ionicons
        name={focused ? 'cart' : 'cart-outline'} // Icône pleine si sélectionnée, sinon contour
        size={22}
        color={focused ? BrandColors.copper : BrandColors.charcoal} // Change de couleur dynamiquement
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
    width: 28,
    height: 28,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BrandColors.copper, // Utilisation de votre couleur cuivre pour l'harmonie
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: BrandColors.white, // Démarcation blanche pour un effet propre
  },
  badgeText: {
    color: BrandColors.white,
    fontSize: 9,
    fontWeight: '700',
  },
});
