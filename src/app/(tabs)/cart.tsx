import { Stack, router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button/button';
import { BrandColors, BrandFonts } from '@/constants/theme';
import { resolveImageUrl } from '@/services/productService';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function CartScreen() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const token = useAuthStore((state) => state.token);

  const shippingFee = cartItems.length > 0 ? 2500 : 0;
  const grandTotal = totalPrice + shippingFee;
  const isCheckoutDisabled = cartItems.length === 0;

  const handleCheckout = () => {
    if (!token) {
      router.push('/auth/login');
      return;
    }

    router.push('/checkout');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Mon panier',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: BrandFonts.display,
            fontSize: 20,
            color: BrandColors.charcoal,
          },
          headerStyle: {
            backgroundColor: BrandColors.stone,
          },
          headerTintColor: BrandColors.charcoal,
        }}
      />

      <SafeAreaView style={styles.safeArea}>
        {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptyText}>Ajoutez des articles pour commencer votre commande.</Text>
          <Button
            title="Retour à la boutique"
            variant="primary"
            onPress={() => router.push('/(tabs)')}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {cartItems.map(({ product, quantity }) => (
            <View key={product.id} style={styles.itemCard}>
              <Image
                source={{ uri: resolveImageUrl(product.images?.[0]?.url ?? '') }}
                style={styles.itemImage}
                resizeMode="cover"
              />

              <View style={styles.itemContent}>
                <Text style={styles.itemName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.itemPrice}>
                  {product.price.toLocaleString('fr-FR')} FCFA / article
                </Text>

                <View style={styles.quantityRow}>
                  <Pressable
                    style={styles.quantityButton}
                    accessibilityRole="button"
                    onPress={() => updateQuantity(product.id, 'decrease')}
                  >
                    <Text style={styles.quantityText}>−</Text>
                  </Pressable>

                  <Text style={styles.quantityValue}>{quantity}</Text>

                  <Pressable
                    style={styles.quantityButton}
                    accessibilityRole="button"
                    onPress={() => updateQuantity(product.id, 'increase')}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.itemMeta}>
                <Text style={styles.subtotal}>{(product.price * quantity).toLocaleString('fr-FR')} FCFA</Text>
                <Pressable onPress={() => removeFromCart(product.id)} accessibilityRole="button">
                  <Text style={styles.removeText}>Supprimer</Text>
                </Pressable>
              </View>
            </View>
          ))}

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Articles</Text>
              <Text style={styles.summaryValue}>{totalItems}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sous-total</Text>
              <Text style={styles.summaryValue}>{totalPrice.toLocaleString('fr-FR')} FCFA</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Livraison</Text>
              <Text style={styles.summaryValue}>{shippingFee.toLocaleString('fr-FR')} FCFA</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{grandTotal.toLocaleString('fr-FR')} FCFA</Text>
            </View>

            <Button
              title="Commander"
              onPress={handleCheckout}
              disabled={isCheckoutDisabled}
              style={styles.confirmButton}
            />

            <Button
              title="Vider le panier"
              variant="ghost"
              onPress={clearCart}
              style={styles.clearButton}
            />
          </View>
        </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.stone,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  emptyTitle: {
    color: BrandColors.charcoal,
    fontSize: 24,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  emptyText: {
    color: BrandColors.slate,
    fontSize: 14,
    fontFamily: BrandFonts.body,
    textAlign: 'center',
  },
  emptyButton: {
    alignSelf: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
  itemCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: BrandColors.line,
  },
  itemImage: {
    width: 82,
    height: 82,
    borderRadius: 14,
    backgroundColor: BrandColors.stone,
  },
  itemContent: {
    flex: 1,
    gap: 6,
  },
  itemName: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontFamily: BrandFonts.display,
    lineHeight: 18,
  },
  itemPrice: {
    color: BrandColors.slate,
    fontSize: 12,
    fontFamily: BrandFonts.body,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: BrandColors.stone,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: BrandColors.charcoal,
    fontSize: 18,
    fontWeight: '700',
  },
  quantityValue: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
  },
  itemMeta: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  subtotal: {
    color: BrandColors.copper,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
  },
  removeText: {
    color: BrandColors.slate,
    fontSize: 11,
    fontFamily: BrandFonts.body,
  },
  summaryCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: BrandColors.line,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: BrandColors.slate,
    fontSize: 14,
    fontFamily: BrandFonts.body,
  },
  summaryValue: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: BrandColors.line,
    paddingTop: 8,
  },
  totalLabel: {
    color: BrandColors.charcoal,
    fontSize: 17,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  totalValue: {
    color: BrandColors.copper,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  confirmButton: {
    alignSelf: 'stretch',
  },
  clearButton: {
    alignSelf: 'stretch',
  },
});
