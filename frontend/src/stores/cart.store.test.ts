import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from './cart.store';
import { cartService } from '../services/cartService';

vi.mock('../services/cartService', () => ({
  cartService: {
    getCart: vi.fn(),
    addItem: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn(),
    clearCart: vi.fn(),
    checkout: vi.fn(),
  },
}));

const mockedCartService = vi.mocked(cartService);

const firstCart = {
  items: [
    {
      productId: 'prod_ebook_vue',
      name: 'Vue 3 Mastery E-book',
      price: 29,
      thumbnailUrl: 'image.jpg',
      quantity: 2,
    },
  ],
  totalItems: 2,
  totalPrice: 58,
};

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('loads cart items from the backend', async () => {
    mockedCartService.getCart.mockResolvedValue(firstCart);

    const store = useCartStore();

    await store.loadCart();

    expect(store.items).toEqual(firstCart.items);
    expect(store.totalItems).toBe(2);
    expect(store.totalPrice).toBe(58);
  });

  it('adds an item and updates totals', async () => {
    mockedCartService.addItem.mockResolvedValue(firstCart);

    const store = useCartStore();

    await store.addItem('prod_ebook_vue');

    expect(mockedCartService.addItem).toHaveBeenCalledWith('prod_ebook_vue', 1);
    expect(store.totalItems).toBe(2);
    expect(store.totalPrice).toBe(58);
  });

  it('removes item when quantity is lower than one', async () => {
    mockedCartService.removeItem.mockResolvedValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });

    const store = useCartStore();

    await store.updateQuantity('prod_ebook_vue', 0);

    expect(mockedCartService.removeItem).toHaveBeenCalledWith('prod_ebook_vue');
    expect(store.isEmpty).toBe(true);
  });
});
