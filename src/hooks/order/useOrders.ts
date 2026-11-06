import { useCallback, useEffect, useState } from 'react';

import { getMyOrder, getMyOrders } from '@/services/orderService';
import { useAuthStore } from '@/store/authStore';
import type { Order } from '@/types/order';

export function useMyOrders() {
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const mergeOrders = useCallback((incoming: Order[]) => {
    setOrders((current) => {
      const map = new Map<number, Order>();

      [...current, ...incoming].forEach((order) => {
        map.set(order.id, order);
      });

      return Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }, []);

  const loadPage = useCallback(
    async (nextPage: number, append: boolean) => {
      if (!token) {
        setOrders([]);
        setError(null);
        setHasMore(false);
        return;
      }

      if (append) {
        setIsLoadingNext(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const response = await getMyOrders(token, { page: nextPage, size: 20 });
        const incoming = response.content ?? [];

        if (append) {
          mergeOrders(incoming);
        } else {
          setOrders(incoming);
        }

        setHasMore(!response.last);
        setPage(response.number ?? nextPage);
      } catch {
        setError('Impossible de charger vos commandes.');
      } finally {
        setIsLoading(false);
        setIsLoadingNext(false);
        setIsRefreshing(false);
      }
    },
    [mergeOrders, token]
  );

  const refresh = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsRefreshing(true);
    await loadPage(0, false);
  }, [loadPage, token]);

  const loadMore = useCallback(async () => {
    if (!token || !hasMore || isLoadingNext || isLoading) {
      return;
    }

    await loadPage(page + 1, true);
  }, [hasMore, isLoading, isLoadingNext, loadPage, page, token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const timer = setTimeout(() => {
      void loadPage(0, false);
    }, 0);

    return () => clearTimeout(timer);
  }, [loadPage, token]);

  return {
    orders,
    isLoading,
    isRefreshing,
    isLoadingNext,
    error,
    hasMore,
    refresh,
    loadMore,
  };
}

export function useMyOrder(orderId?: number | string) {
  const token = useAuthStore((state) => state.token);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(orderId));
  const [error, setError] = useState<string | null>(null);

  const loadOrder = useCallback(async () => {
    if (!token || !orderId) {
      setOrder(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const nextOrder = await getMyOrder(token, orderId);
      setOrder(nextOrder);
    } catch (requestError) {
      if (requestError instanceof Error && requestError.name === 'ApiError') {
        setError('Commande introuvable.');
        setOrder(null);
        return;
      }

      setError('Commande introuvable.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  }, [orderId, token]);

  useEffect(() => {
    if (!token || !orderId) {
      return;
    }

    const timer = setTimeout(() => {
      void loadOrder();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadOrder, orderId, token]);

  return {
    order,
    isLoading,
    error,
    refetch: loadOrder,
  };
}
