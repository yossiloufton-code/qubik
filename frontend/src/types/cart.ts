export interface CartItem {
  productId: string;
  name: string;
  price: number;
  thumbnailUrl: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CheckoutResult {
  orderId: string;
  totalItems: number;
  totalPrice: number;
  createdAt: string;
}
