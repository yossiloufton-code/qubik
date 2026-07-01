import { defineStore } from 'pinia';
import { cartService } from '../services/cartService';
import type { CartItem, CheckoutResult } from '../types/cart';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  lastCheckout: CheckoutResult | null;
}

const toErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'Cart action failed. Please try again.';
};

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isLoading: false,
    error: null,
    lastCheckout: null,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    setItems(items: CartItem[]) {
      this.items = items;
    },

    async runCartAction(action: () => Promise<{ items: CartItem[] }>) {
      this.isLoading = true;
      this.error = null;

      try {
        const cart = await action();
        this.items = cart.items;
      } catch (error) {
        this.error = toErrorMessage(error);
      } finally {
        this.isLoading = false;
      }
    },

    async loadCart() {
      await this.runCartAction(() => cartService.getCart());
    },

    async addItem(productId: string, quantity = 1) {
      await this.runCartAction(() => cartService.addItem(productId, quantity));
    },

    async updateQuantity(productId: string, quantity: number) {
      if (quantity < 1) {
        await this.removeItem(productId);
        return;
      }

      await this.runCartAction(() => cartService.updateItem(productId, quantity));
    },

    async removeItem(productId: string) {
      await this.runCartAction(() => cartService.removeItem(productId));
    },

    async clearCart() {
      await this.runCartAction(() => cartService.clearCart());
      this.lastCheckout = null;
    },

    async checkout() {
      this.isLoading = true;
      this.error = null;
      this.lastCheckout = null;

      try {
        this.lastCheckout = await cartService.checkout();
        this.items = [];
      } catch (error) {
        this.error = toErrorMessage(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
