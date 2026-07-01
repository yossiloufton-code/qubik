export type ProductCategory = 'ebook' | 'software-license' | 'online-course' | 'template';

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

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

export type ProductSortBy = 'name' | 'price';
export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  name?: string;
  category?: ProductCategory;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
}
