import { onMounted, ref } from 'vue';
import { productService } from '../services/productService';
import type { Product } from '../types/product';
import { useApiRequest } from './useApiRequest';

export const useProductDetails = (productId: string) => {
  const product = ref<Product | null>(null);
  const { isLoading, error, run } = useApiRequest();

  const fetchProduct = async () => {
    const response = await run(() => productService.getProductById(productId));

    product.value = response?.data ?? null;
  };

  onMounted(() => {
    void fetchProduct();
  });

  return {
    product,
    isLoading,
    error,
    fetchProduct,
  };
};
