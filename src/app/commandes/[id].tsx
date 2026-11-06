import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenState } from '@/components/screen-state';
import { BrandColors, BrandFonts } from '@/constants/theme';
import { ApiError } from '@/services/api';
import { cancelMyOrder, getMyOrder } from '@/services/orderService';
import { resolveImageUrl } from '@/services/productService';
import { useAuthStore } from '@/store/authStore';
import type { Order } from '@/types/order';

const statusLabels: Record<string, string> = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmée',
  PREPARING: 'En préparation',
  SHIPPED: 'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
};

const statusColors: Record<string, string> = {
  PENDING: BrandColors.sand,
  CONFIRMED: BrandColors.copper,
  PREPARING: BrandColors.charcoal,
  SHIPPED: BrandColors.slate,
  DELIVERED: BrandColors.copper,
  CANCELLED: BrandColors.slate,
};

const formatDate = (value?: string) => {
  if (!value) {
    return 'Date inconnue';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Date inconnue';
  }

  return date.toLocaleDateString('fr-FR');
};

export default function OrderDetailScreen() {
  const { id, created } = useLocalSearchParams<{ id?: string; created?: string }>();
  const token = useAuthStore((state) => state.token);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);

  const loadOrder = useCallback(async () => {
    if (!token || !id) {
      setOrder(null);
      setError('Veuillez vous reconnecter pour voir cette commande.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const nextOrder = await getMyOrder(token, id);
      setOrder(nextOrder);
    } catch (requestError) {
      if (requestError instanceof ApiError && (requestError.status === 403 || requestError.status === 404)) {
        setError('Commande introuvable.');
        setOrder(null);
        return;
      }

      setError('Commande introuvable.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    void loadOrder();
  }, [loadOrder]);

  const statusTextColor = order && order.status === 'PENDING' ? BrandColors.charcoal : BrandColors.white;

  const handleCancel = () => {
    if (!token || !order || order.status !== 'PENDING') {
      return;
    }

    Alert.alert('Annuler la commande', 'Voulez-vous vraiment annuler cette commande ?', [
      { text: 'Retour', style: 'cancel' },
      {
        text: 'Annuler',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsCanceling(true);
            await cancelMyOrder(token, order.id);
            await loadOrder();
          } catch (requestError) {
            if (requestError instanceof ApiError && (requestError.status === 403 || requestError.status === 404)) {
              Alert.alert('Commande introuvable.');
              return;
            }

            Alert.alert('Impossible d’annuler cette commande pour le moment.');
          } finally {
            setIsCanceling(false);
          }
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Commande',
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
          headerRight: undefined,
        }}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScreenState
          isLoading={isLoading}
          error={error}
          loadingText="Chargement de la commande..."
          errorText="Commande introuvable."
          onRetry={() => {
            void loadOrder();
          }}
        >
          {order ? (
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
              {created === '1' ? (
                <View style={styles.successBanner}>
                  <Text style={styles.successTitle}>Commande enregistrée</Text>
                  <View style={styles.successActions}>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => router.replace('/(tabs)')}
                      style={styles.primaryButton}
                    >
                      <Text style={styles.primaryButtonText}>Continuer mes achats</Text>
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => router.push('/commandes')}
                      style={styles.secondaryButton}
                    >
                      <Text style={styles.secondaryButtonText}>Voir mes commandes</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              <View style={styles.headerCard}>
                <View>
                  <Text style={styles.label}>Commande n° {order.id}</Text>
                  <Text style={styles.dateText}>{formatDate(order.createdAt)}</Text>
                </View>

                <View style={[styles.statusBadge, { backgroundColor: statusColors[order.status] ?? BrandColors.sand }]}>
                  <Text style={[styles.statusText, { color: statusTextColor }]}>
                    {statusLabels[order.status] ?? order.status}
                  </Text>
                </View>
              </View>

              <View style={styles.listWrapper}>
                {order.items.map((item) => {
                  const imageUri = resolveImageUrl(item.product.image);

                  return (
                    <Pressable
                      key={`${order.id}-${item.product.id}`}
                      accessibilityRole="button"
                      onPress={() => {
                        if (item.product.slug) {
                          router.push({ pathname: '/product/[slug]', params: { slug: item.product.slug } });
                        }
                      }}
                      style={styles.itemCard}
                    >
                      <Image source={{ uri: imageUri }} style={styles.itemImage} resizeMode="cover" />

                      <View style={styles.itemContent}>
                        <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
                        <Text style={styles.itemMeta}>
                          {item.quantity} x {item.unitPrice.toLocaleString('fr-FR')} FCFA
                        </Text>
                        <Text style={styles.itemSubtotal}>{item.subtotal.toLocaleString('fr-FR')} FCFA</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total officiel</Text>
                <Text style={styles.summaryValue}>{order.totalAmount.toLocaleString('fr-FR')} FCFA</Text>
              </View>

              {order.status === 'PENDING' ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={handleCancel}
                  disabled={isCanceling}
                  style={({ pressed }) => [
                    styles.cancelButton,
                    pressed && !isCanceling && styles.cancelButtonPressed,
                    isCanceling && styles.cancelButtonDisabled,
                  ]}
                >
                  <Text style={styles.cancelButtonText}>{isCanceling ? 'Annulation...' : 'Annuler la commande'}</Text>
                </Pressable>
              ) : null}
            </ScrollView>
          ) : null}
        </ScreenState>
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
    paddingTop: 20,
    paddingBottom: 32,
    gap: 16,
  },
  successBanner: {
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BrandColors.line,
    padding: 16,
    gap: 12,
  },
  successTitle: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    fontSize: 18,
  },
  successActions: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: BrandColors.charcoal,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: BrandColors.white,
    fontFamily: BrandFonts.body,
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: BrandColors.stone,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.body,
    fontWeight: '700',
    fontSize: 14,
  },
  headerCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BrandColors.line,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    color: BrandColors.slate,
    fontFamily: BrandFonts.body,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dateText: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    color: BrandColors.white,
    fontFamily: BrandFonts.body,
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  listWrapper: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BrandColors.line,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: BrandColors.stone,
  },
  itemContent: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    fontSize: 14,
  },
  itemMeta: {
    color: BrandColors.slate,
    fontFamily: BrandFonts.body,
    fontSize: 12,
  },
  itemSubtotal: {
    color: BrandColors.copper,
    fontFamily: BrandFonts.display,
    fontSize: 14,
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
    fontFamily: BrandFonts.body,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryValue: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    fontSize: 26,
  },
  cancelButton: {
    backgroundColor: BrandColors.white,
    borderWidth: 1,
    borderColor: BrandColors.line,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonPressed: {
    opacity: 0.85,
  },
  cancelButtonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.body,
    fontSize: 14,
    fontWeight: '700',
  },
});
