import { z } from 'zod';

export const productIdParamsSchema = z.object({
  productId: z.string().trim().min(1, 'Product id is required'),
});

export const addCartItemBodySchema = z.object({
  productId: z.string().trim().min(1, 'Product id is required'),
  quantity: z.number().int().positive().optional(),
});

export const updateCartItemBodySchema = z.object({
  quantity: z.number().int().positive(),
});
