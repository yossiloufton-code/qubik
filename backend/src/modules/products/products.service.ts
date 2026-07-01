import { AppError } from '../../errors/app-error';
import { ErrorCodes } from '../../errors/error-codes';
import { productsMock } from './products.mock';
import { PRODUCT_CATEGORIES } from './products.constants';
import type { Product, ProductCategory, ProductFilters, ProductListItem } from './product.types';

const toProductListItem = (product: Product): ProductListItem => ({
  id: product.id,
  name: product.name,
  price: product.price,
  shortDescription: product.shortDescription,
  thumbnailUrl: product.thumbnailUrl,
  category: product.category,
});

export const productService = {
  getProducts(filters: ProductFilters): ProductListItem[] {
    const name = filters.name?.trim().toLowerCase();
    const category = filters.category;
    const sortBy = filters.sortBy ?? 'name';
    const sortOrder = filters.sortOrder ?? 'asc';

    let result = [...productsMock];

    if (name) {
      result = result.filter((product) => product.name.toLowerCase().includes(name));
    }

    if (category) {
      result = result.filter((product) => product.category === category);
    }

    result.sort((a, b) => {
      const direction = sortOrder === 'asc' ? 1 : -1;

      if (sortBy === 'price') {
        return (a.price - b.price) * direction;
      }

      return a.name.localeCompare(b.name) * direction;
    });

    return result.map(toProductListItem);
  },

  getProductById(productId: string): Product {
    const product = productsMock.find((item) => item.id === productId);

    if (!product) {
      throw new AppError('Product was not found', 404, ErrorCodes.ProductNotFound, {
        productId,
      });
    }

    return product;
  },

  getCategories(): ProductCategory[] {
    return [...PRODUCT_CATEGORIES];
  },
};
