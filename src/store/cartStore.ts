import { create } from 'zustand';

import type { Product } from '@/data/products.mock';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, action: 'increase' | 'decrease') => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,

  addToCart: (product: Product) => {
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.product.id === product.id);

      const nextItems = existingItem
        ? state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { product, quantity: 1 }];

      return {
        cartItems: nextItems,
        totalItems: nextItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: nextItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
      };
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => {
      const nextItems = state.cartItems.filter((item) => item.product.id !== productId);

      return {
        cartItems: nextItems,
        totalItems: nextItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: nextItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
      };
    });
  },

  updateQuantity: (productId: number, action: 'increase' | 'decrease') => {
    set((state) => {
      const nextItems = state.cartItems
        .map((item) => {
          if (item.product.id !== productId) {
            return item;
          }

          const nextQuantity =
            action === 'increase' ? item.quantity + 1 : item.quantity - 1;

          return nextQuantity <= 0 ? null : { ...item, quantity: nextQuantity };
        })
        .filter(Boolean) as CartItem[];

      return {
        cartItems: nextItems,
        totalItems: nextItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: nextItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
      };
    });
  },

  clearCart: () => {
    set({ cartItems: [], totalItems: 0, totalPrice: 0 });
  },
}));
