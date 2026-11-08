import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button/button';
import { ScreenState } from '@/components/screen-state';
import { BrandColors, BrandFonts } from '@/constants/theme';
import { getMyOrders } from '@/services/orderService';
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

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Date inconnue';
  }

  return date.toLocaleDateString('fr-FR');
};

function EmptyOrdersState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Aucune commande pour le moment</Text>
      <Text style={styles.emptyText}>Commencez votre shopping pour voir vos commandes ici.</Text>
      <Button
        title="Découvrir la boutique"
        variant="primary"
        onPress={() => router.push('/(tabs)')}
        style={styles.emptyButton}
      />
    </View>
  );
}

export default function OrdersListScreen() {
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!token) {
      setOrders([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await getMyOrders(token, { page: 0, size: 20 });
      setOrders(response.content ?? []);
    } catch {
      setError('Impossible de charger vos commandes.');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const renderItem = ({ item }: { item: Order }) => {
    const totalItems = item.items.reduce((sum, orderItem) => sum + orderItem.quantity, 0);
    const statusTextColor = item.status === 'PENDING' ? BrandColors.charcoal : BrandColors.white;

    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          router.push({ pathname: '/commandes/[id]', params: { id: String(item.id) } });
        }}
        style={styles.orderCard}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.orderId}>Commande n° {item.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] ?? BrandColors.sand }]}>
            <Text style={[styles.statusText, { color: statusTextColor }]}>
              {statusLabels[item.status] ?? item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{item.totalAmount.toLocaleString('fr-FR')} FCFA</Text>
          <Text style={styles.summaryValue}>{totalItems} article{totalItems > 1 ? 's' : ''}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Mes commandes',
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
          loadingText="Chargement de vos commandes..."
          errorText="Impossible de charger vos commandes."
          onRetry={() => {
            void loadOrders();
          }}
        >
          <FlatList
            data={orders}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !isLoading && !error ? <EmptyOrdersState /> : undefined
            }
            renderItem={renderItem}
          />
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
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 12,
  },
  orderCard: {
    backgroundColor: BrandColors.white,
    borderWidth: 1,
    borderColor: BrandColors.line,
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  orderId: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    fontSize: 15,
    flexShrink: 1,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    color: BrandColors.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
    textTransform: 'uppercase',
  },
  dateText: {
    color: BrandColors.slate,
    fontSize: 12,
    fontFamily: BrandFonts.body,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontFamily: BrandFonts.display,
  },
  summaryValue: {
    color: BrandColors.slate,
    fontSize: 12,
    fontFamily: BrandFonts.body,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    color: BrandColors.slate,
    fontFamily: BrandFonts.body,
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    fontSize: 24,
    textAlign: 'center',
  },
  emptyText: {
    color: BrandColors.slate,
    fontFamily: BrandFonts.body,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyButton: {
    alignSelf: 'center',
  },
});
