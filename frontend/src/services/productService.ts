import { apiClient } from './apiClient';
import type { ApiSuccessResponse } from '../types/api';
import type { Product, ProductCategory, ProductFilters, ProductListItem } from '../types/product';

export const productService = {
  getProducts(filters: ProductFilters): Promise<ApiSuccessResponse<ProductListItem[]>> {
    return apiClient.request<ProductListItem[]>('/products', {
      query: {
        name: filters.name,
        category: filters.category,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      },
    });
  },

  getProductById(productId: string): Promise<ApiSuccessResponse<Product>> {
    return apiClient.request<Product>(`/products/${productId}`);
  },

  getCategories(): Promise<ApiSuccessResponse<ProductCategory[]>> {
    return apiClient.request<ProductCategory[]>('/products/categories');
  },
};
