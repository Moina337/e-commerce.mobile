import { ApiError, apiFetch } from '@/services/api';
import type { CreateOrderInput, Order, OrderPage } from '@/types/order';

// Les identifiants de l'API sont des entiers strictement positifs (int64).
// Un paramètre de route est un texte : on le convertit et on refuse les valeurs invalides.
const toPositiveInt = (value: number | string, message: string, code: string): number => {
  const n = typeof value === 'string' ? Number(value) : value;

  if (!Number.isSafeInteger(n) || n <= 0) {
    throw new ApiError(400, message, code);
  }

  return n;
};

export async function createOrder(token: string, input: CreateOrderInput): Promise<Order> {
  if (input.items.length === 0) {
    throw new ApiError(400, 'Le panier est vide.', 'EMPTY_ORDER');
  }

  // On n'envoie QUE productId et quantity, jamais un prix ni un nom :
  // le serveur calcule les montants, et un objet de panier peut contenir d'autres champs.
  const items = input.items.map((item) => ({
    productId: toPositiveInt(item.productId, 'Produit invalide.', 'INVALID_PRODUCT_ID'),
    quantity: toPositiveInt(item.quantity, 'Quantité invalide.', 'INVALID_QUANTITY'),
  }));

  // Pas de nouvel essai automatique ici : sans clé d'idempotence côté serveur,
  // relancer après un délai dépassé pourrait créer deux commandes.
  return apiFetch<Order>(
    '/orders',
    {
      method: 'POST',
      body: JSON.stringify({ items }),
    },
    token
  );
}

export async function getMyOrders(
  token: string,
  params: { page?: number; size?: number } = {}
): Promise<OrderPage> {
  const page = Math.max(0, Math.trunc(params.page ?? 0));
  const size = Math.max(1, Math.trunc(params.size ?? 20));

  return apiFetch<OrderPage>(`/orders?page=${page}&size=${size}`, { method: 'GET' }, token);
}

export async function getMyOrder(token: string, id: number | string): Promise<Order> {
  const orderId = toPositiveInt(id, 'Commande introuvable.', 'INVALID_ORDER_ID');
  return apiFetch<Order>(`/orders/${orderId}`, { method: 'GET' }, token);
}

export async function cancelMyOrder(token: string, id: number | string): Promise<void> {
  const orderId = toPositiveInt(id, 'Commande introuvable.', 'INVALID_ORDER_ID');
  await apiFetch<void>(`/orders/${orderId}`, { method: 'DELETE' }, token);
}