import { Stack, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ApiError } from '@/services/api';
import { createOrder } from '@/services/orderService';
import { resolveImageUrl } from '@/services/productService';
import { BrandColors, BrandFonts } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutScreen() {
  const token = useAuthStore((state) => state.token);
  const signOut = useAuthStore((state) => state.signOut);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const submitLock = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token]);

  const handleCheckout = async () => {
    if (!token || submitLock.current || cartItems.length === 0) {
      return;
    }

    submitLock.current = true;
    setError(null);
    setIsSubmitting(true);

    try {
      const createdOrder = await createOrder(token, {
        items: cartItems.map(({ product, quantity }) => ({
          productId: Number(product.id),
          quantity: Number(quantity),
        })),
      });

      clearCart();
      router.replace({
        pathname: '/commandes/[id]',
        params: { id: String(createdOrder.id), created: '1' },
      });
    } catch (requestError) {
      if (requestError instanceof ApiError && (requestError.status === 401 || requestError.status === 403)) {
        await signOut();
        setError('Votre session a expiré. Veuillez vous reconnecter.');
        router.push('/auth/login');
        return;
      }

      if (requestError instanceof ApiError && requestError.status === 400) {
        setError('La commande n’a pas pu être validée. Vérifiez votre panier.');
        return;
      }

      if (requestError instanceof ApiError && (requestError.status === 408 || requestError.status >= 500)) {
        setError('Nous n’avons pas pu confirmer l’envoi. Vérifie dans « Mes commandes » avant de réessayer.');
        return;
      }

      setError('Nous n’avons pas pu confirmer l’envoi. Vérifie dans « Mes commandes » avant de réessayer.');
    } finally {
      setIsSubmitting(false);
      submitLock.current = false;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Finaliser la commande',
          headerBackTitle: 'Retour',
          headerRight: undefined,
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
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Récapitulatif</Text>

          {cartItems.map(({ product, quantity }) => (
            <View key={product.id} style={styles.itemCard}>
              <Image
                source={{ uri: resolveImageUrl(product.images?.[0]?.url ?? '') }}
                style={styles.itemImage}
                resizeMode="cover"
              />

              <View style={styles.itemContent}>
                <Text style={styles.itemName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.itemMeta}>Quantité : {quantity}</Text>
                <Text style={styles.itemMeta}>
                  Sous-total estimé : {(product.price * quantity).toLocaleString('fr-FR')} FCFA
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total estimé</Text>
            <Text style={styles.totalValue}>{totalPrice.toLocaleString('fr-FR')} FCFA</Text>
            <Text style={styles.note}>Le montant final est confirmé par le serveur.</Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              void handleCheckout();
            }}
            disabled={isSubmitting || cartItems.length === 0}
            style={({ pressed }) => [
              styles.confirmButton,
              (isSubmitting || cartItems.length === 0) && styles.confirmButtonDisabled,
              pressed && !isSubmitting && cartItems.length > 0 && styles.confirmButtonPressed,
            ]}
          >
            <Text style={styles.confirmButtonText}>
              {isSubmitting ? 'Confirmation...' : 'Confirmer la commande'}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Retour au panier</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.stone,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: BrandFonts.display,
    color: BrandColors.charcoal,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BrandColors.line,
    padding: 12,
  },
  itemImage: {
    width: 78,
    height: 78,
    borderRadius: 14,
    backgroundColor: BrandColors.stone,
  },
  itemContent: {
    flex: 1,
    gap: 5,
  },
  itemName: {
    fontSize: 14,
    fontFamily: BrandFonts.display,
    color: BrandColors.charcoal,
  },
  itemMeta: {
    fontSize: 12,
    fontFamily: BrandFonts.body,
    color: BrandColors.slate,
  },
  summaryCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BrandColors.line,
    padding: 16,
    gap: 6,
  },
  summaryLabel: {
    color: BrandColors.slate,
    fontSize: 13,
    fontFamily: BrandFonts.body,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  totalValue: {
    color: BrandColors.charcoal,
    fontSize: 28,
    fontFamily: BrandFonts.display,
  },
  note: {
    color: BrandColors.slate,
    fontSize: 12,
    fontFamily: BrandFonts.body,
  },
  confirmButton: {
    backgroundColor: BrandColors.charcoal,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonPressed: {
    opacity: 0.9,
  },
  confirmButtonText: {
    color: BrandColors.white,
    fontSize: 15,
    fontFamily: BrandFonts.body,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: BrandColors.white,
    borderWidth: 1,
    borderColor: BrandColors.line,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontFamily: BrandFonts.body,
    fontWeight: '700',
  },
  errorText: {
    color: BrandColors.copper,
    backgroundColor: '#F7ECE2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontFamily: BrandFonts.body,
    fontSize: 13,
  },
});
