import type { RequestHandler } from 'express';
import { sendSuccess } from '../../utils/api-response';
import { productService } from './products.service';
import type { GetProductsQueryDto } from './products.validation';

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
    const product = productService.getProductById(req.params.id);

    return sendSuccess(res, product);
  }) satisfies RequestHandler,

  getCategories: ((_req, res) => {
    const categories = productService.getCategories();

    return sendSuccess(res, categories);
  }) satisfies RequestHandler,
};
