import { apiClient } from './apiClient';
import type { Cart, CheckoutResult } from '../types/cart';

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await apiClient.request<Cart>('/cart');
    return response.data;
  },

  async addItem(productId: string, quantity = 1): Promise<Cart> {
    const response = await apiClient.request<Cart>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    return response.data;
  },

  async updateItem(productId: string, quantity: number): Promise<Cart> {
    const response = await apiClient.request<Cart>(`/cart/items/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity,
      }),
    });

    return response.data;
  },

  async removeItem(productId: string): Promise<Cart> {
    const response = await apiClient.request<Cart>(`/cart/items/${productId}`, {
      method: 'DELETE',
    });

    return response.data;
  },

  async clearCart(): Promise<Cart> {
    const response = await apiClient.request<Cart>('/cart', {
      method: 'DELETE',
    });

    return response.data;
  },

  async checkout(): Promise<CheckoutResult> {
    const response = await apiClient.request<CheckoutResult>('/cart/checkout', {
      method: 'POST',
    });

    return response.data;
  },
};
