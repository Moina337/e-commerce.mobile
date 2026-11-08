import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button/button';
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
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(isInCart);
  }, [isInCart]);

  const handlePress = () => {
    addToCart(product);
    setIsAdded(true);
  };

  return (
    <Button
      title={isAdded ? 'Ajouté !' : 'Ajouter au panier'}
      variant="primary"
      onPress={handlePress}
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderRadius: 14,
    paddingVertical: 14,
  },
});
