import { z } from 'zod';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_SORT_FIELDS,
  SORT_ORDERS,
} from './products.constants';

export const getProductsQuerySchema = z.object({
  name: z.string().trim().optional(),
  category: z.enum(PRODUCT_CATEGORIES).optional(),
  sortBy: z.enum(PRODUCT_SORT_FIELDS).optional(),
  sortOrder: z.enum(SORT_ORDERS).optional(),
});

export const productIdParamsSchema = z.object({
  id: z.string().trim().min(1, 'Product id is required'),
});

export type GetProductsQueryDto = z.infer<typeof getProductsQuerySchema>;
