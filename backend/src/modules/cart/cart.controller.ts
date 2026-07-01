import type { RequestHandler } from 'express';
import { sendCreated, sendSuccess } from '../../utils/api-response';
import { cartService } from './cart.service';

export const cartController = {
  getCart: ((_req, res) => {
    return sendSuccess(res, cartService.getCart());
  }) satisfies RequestHandler,

  addItem: ((req, res) => {
    const cart = cartService.addItem(req.body);

    return sendCreated(res, cart);
  }) satisfies RequestHandler,

  updateItem: ((req, res) => {
    const cart = cartService.updateItem(req.params.productId, req.body);

    return sendSuccess(res, cart);
  }) satisfies RequestHandler,

  removeItem: ((req, res) => {
    const cart = cartService.removeItem(req.params.productId);

    return sendSuccess(res, cart);
  }) satisfies RequestHandler,

  clearCart: ((_req, res) => {
    return sendSuccess(res, cartService.clearCart());
  }) satisfies RequestHandler,

  checkout: ((_req, res) => {
    return sendSuccess(res, cartService.checkout());
  }) satisfies RequestHandler,
};
