import type { Review } from './review';

export type ProductCategory = 'ebook' | 'software-license' | 'online-course' | 'template';

export type ProductSortBy = 'name' | 'price';

export type SortOrder = 'asc' | 'desc';

export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  thumbnailUrl: string;
  category: ProductCategory;
  reviews: Review[];
}

export type ProductListItem = Pick<
  Product,
  'id' | 'name' | 'price' | 'shortDescription' | 'thumbnailUrl' | 'category'
>;

export interface ProductFilters {
  name?: string;
  category?: ProductCategory | '';
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
}
