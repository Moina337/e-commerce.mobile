export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type OrderProductSummary = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type OrderItem = {
  product: OrderProductSummary;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Order = {
  id: number;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
};

export type OrderPage = {
  content: Order[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type CreateOrderInput = {
  items: {
    productId: number;
    quantity: number;
  }[];
};
