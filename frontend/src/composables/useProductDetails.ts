import { computed, toValue, type MaybeRef } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { productService } from '../services/productService';

export const useProductDetails = (productId: MaybeRef<string>) => {
  const normalizedProductId = computed(() => toValue(productId));

  const productQuery = useQuery({
    queryKey: computed(() => ['product', normalizedProductId.value]),
    queryFn: () => productService.getProductById(normalizedProductId.value),
    enabled: computed(() => Boolean(normalizedProductId.value)),
  });

  const product = computed(() => productQuery.data.value?.data ?? null);

  const isLoading = computed(() => productQuery.isPending.value);

  const error = computed(() => {
    const queryError = productQuery.error.value;

    return queryError instanceof Error ? queryError.message : null;
  });

  const fetchProduct = async () => {
    await productQuery.refetch();
  };

  return {
    product,
    isLoading,
    error,
    fetchProduct,
  };
};
