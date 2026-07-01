import type { RequestHandler } from 'express';
import { AppError } from '../../errors/app-error';
import { ErrorCodes } from '../../errors/error-codes';
import { sendSuccess } from '../../utils/api-response';
import { productService } from './products.service';
import type { GetProductsQueryDto } from './products.validation';

const getRequiredParam = (params: Record<string, unknown>, paramName: string): string => {
  const value = params[paramName];

  if (typeof value !== 'string' || !value.trim()) {
    throw new AppError(`${paramName} is required`, 400, ErrorCodes.BadRequest, {
      [paramName]: value,
    });
  }

  return value;
};

export const productsController = {
  getProducts: ((req, res) => {
    const filters = req.query as GetProductsQueryDto;
    const products = productService.getProducts(filters);

    return sendSuccess(res, products, {
      count: products.length,
      filters,
    });
  }) satisfies RequestHandler,

  getProductById: ((req, res) => {
    const productId = getRequiredParam(req.params, 'id');
    const product = productService.getProductById(productId);

    return sendSuccess(res, product);
  }) satisfies RequestHandler,

  getCategories: ((_req, res) => {
    const categories = productService.getCategories();

    return sendSuccess(res, categories);
  }) satisfies RequestHandler,
};