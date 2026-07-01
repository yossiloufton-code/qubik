import { AppError } from '../../errors/app-error';
import { ErrorCodes } from '../../errors/error-codes';
import { productService } from '../products/products.service';
import { cartItemsMock } from './cart.mock';
import type { AddCartItemInput, Cart, CheckoutResult, UpdateCartItemInput } from './cart.types';

const calculateCart = (): Cart => {
  const totalItems = cartItemsMock.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItemsMock.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: [...cartItemsMock],
    totalItems,
    totalPrice,
  };
};

const validateQuantity = (quantity: number) => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new AppError('Quantity must be a positive integer', 400, ErrorCodes.InvalidCartQuantity, {
      quantity,
    });
  }
};

export const cartService = {
  getCart(): Cart {
    return calculateCart();
  },

  addItem(input: AddCartItemInput): Cart {
    const quantity = input.quantity ?? 1;
    validateQuantity(quantity);

    const product = productService.getProductById(input.productId);
    const existingItem = cartItemsMock.find((item) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      return calculateCart();
    }

    cartItemsMock.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      thumbnailUrl: product.thumbnailUrl,
      quantity,
    });

    return calculateCart();
  },

  updateItem(productId: string, input: UpdateCartItemInput): Cart {
    validateQuantity(input.quantity);

    const existingItem = cartItemsMock.find((item) => item.productId === productId);

    if (!existingItem) {
      throw new AppError('Cart item was not found', 404, ErrorCodes.NotFound, {
        productId,
      });
    }

    existingItem.quantity = input.quantity;

    return calculateCart();
  },

  removeItem(productId: string): Cart {
    const itemIndex = cartItemsMock.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      throw new AppError('Cart item was not found', 404, ErrorCodes.NotFound, {
        productId,
      });
    }

    cartItemsMock.splice(itemIndex, 1);

    return calculateCart();
  },

  clearCart(): Cart {
    cartItemsMock.splice(0, cartItemsMock.length);
    return calculateCart();
  },

  checkout(): CheckoutResult {
    const cart = calculateCart();

    if (cart.items.length === 0) {
      throw new AppError('Cannot checkout an empty cart', 400, ErrorCodes.BadRequest);
    }

    const result: CheckoutResult = {
      orderId: `order_${Date.now()}`,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      createdAt: new Date().toISOString(),
    };

    cartItemsMock.splice(0, cartItemsMock.length);

    return result;
  },
};
