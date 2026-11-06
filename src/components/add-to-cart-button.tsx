import { Pressable, StyleSheet, Text } from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';
import type { Product } from '@/data/products.mock';
import { useCartStore } from '@/store/cartStore';

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const isInCart = useCartStore((state) =>
    state.cartItems.some((item) => item.product.id === product.id)
  );

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => addToCart(product)}
      style={[styles.button, isInCart && styles.buttonAdded]}
    >
      <Text style={[styles.label, isInCart && styles.labelAdded]}>
        {isInCart ? 'Ajouté !' : 'Ajouter au panier'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: BrandColors.charcoal,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdded: {
    backgroundColor: BrandColors.copper,
  },
  label: {
    color: BrandColors.white,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
  },
  labelAdded: {
    color: BrandColors.white,
  },
});
