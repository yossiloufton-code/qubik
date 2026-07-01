import type { RequestHandler } from 'express';
import { AppError } from '../../errors/app-error';
import { ErrorCodes } from '../../errors/error-codes';
import { sendCreated, sendSuccess } from '../../utils/api-response';
import { cartService } from './cart.service';

const getRequiredParam = (params: Record<string, unknown>, paramName: string): string => {
  const value = params[paramName];

  if (typeof value !== 'string' || !value.trim()) {
    throw new AppError(`${paramName} is required`, 400, ErrorCodes.BadRequest, {
      [paramName]: value,
    });
  }

  return value;
};

export const cartController = {
  getCart: ((_req, res) => {
    return sendSuccess(res, cartService.getCart());
  }) satisfies RequestHandler,

  addItem: ((req, res) => {
    const cart = cartService.addItem(req.body);

    return sendCreated(res, cart);
  }) satisfies RequestHandler,

  updateItem: ((req, res) => {
    const productId = getRequiredParam(req.params, 'productId');
    const cart = cartService.updateItem(productId, req.body);

    return sendSuccess(res, cart);
  }) satisfies RequestHandler,

  removeItem: ((req, res) => {
    const productId = getRequiredParam(req.params, 'productId');
    const cart = cartService.removeItem(productId);

    return sendSuccess(res, cart);
  }) satisfies RequestHandler,

  clearCart: ((_req, res) => {
    return sendSuccess(res, cartService.clearCart());
  }) satisfies RequestHandler,

  checkout: ((_req, res) => {
    return sendSuccess(res, cartService.checkout());
  }) satisfies RequestHandler,
};