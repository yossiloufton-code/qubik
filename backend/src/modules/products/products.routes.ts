import { Router } from 'express';
import { validateRequest } from '../../middleware/validate-request.middleware';
import { productsController } from './products.controller';
import {
  getProductsQuerySchema,
  productIdParamsSchema,
} from './products.validation';

export const productRoutes = Router();

productRoutes.get(
  '/',
  validateRequest({
    query: getProductsQuerySchema,
  }),
  productsController.getProducts,
);

productRoutes.get('/categories', productsController.getCategories);

productRoutes.get(
  '/:id',
  validateRequest({
    params: productIdParamsSchema,
  }),
  productsController.getProductById,
);
