import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request.middleware';
import { cartController } from './cart.controller';
import {
  addCartItemBodySchema,
  productIdParamsSchema,
  updateCartItemBodySchema,
} from './cart.validation';

export const cartRoutes = Router();

cartRoutes.get('/', cartController.getCart);

cartRoutes.post(
  '/items',
  validateRequest({
    body: addCartItemBodySchema,
  }),
  cartController.addItem,
);

cartRoutes.patch(
  '/items/:productId',
  validateRequest({
    params: productIdParamsSchema,
    body: updateCartItemBodySchema,
  }),
  cartController.updateItem,
);

cartRoutes.delete(
  '/items/:productId',
  validateRequest({
    params: productIdParamsSchema,
  }),
  cartController.removeItem,
);

cartRoutes.delete('/', cartController.clearCart);

cartRoutes.post('/checkout', cartController.checkout);
