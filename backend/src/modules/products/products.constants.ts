import type { ProductCategory, ProductSortBy, SortOrder } from './product.types';

export const PRODUCT_CATEGORIES = [
  'ebook',
  'software-license',
  'online-course',
  'template',
] as const satisfies readonly ProductCategory[];

export const PRODUCT_SORT_FIELDS = ['name', 'price'] as const satisfies readonly ProductSortBy[];

export const SORT_ORDERS = ['asc', 'desc'] as const satisfies readonly SortOrder[];
