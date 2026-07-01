import { computed, reactive, ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { productService } from '../services/productService';
import type { ProductCategory, ProductFilters } from '../types/product';

export const useProducts = () => {
  const filters = reactive<ProductFilters>({
    name: '',
    category: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const debouncedName = ref('');
  let searchTimer: number | undefined;

  watch(
    () => filters.name,
    (value) => {
      window.clearTimeout(searchTimer);

      searchTimer = window.setTimeout(() => {
        debouncedName.value = value?.trim() ?? '';
      }, 250);
    },
    { immediate: true },
  );

  const productsQueryKey = computed(() => [
    'products',
    {
      name: debouncedName.value,
      category: filters.category ?? '',
      sortBy: filters.sortBy ?? 'name',
      sortOrder: filters.sortOrder ?? 'asc',
    },
  ]);

  const productsQuery = useQuery({
    queryKey: productsQueryKey,
    queryFn: () =>
      productService.getProducts({
        name: debouncedName.value,
        category: filters.category,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }),
  });

  const categoriesQuery = useQuery({
    queryKey: ['product-categories'],
    queryFn: () => productService.getCategories(),
    staleTime: 10 * 60_000,
  });

  const products = computed(() => productsQuery.data.value?.data ?? []);

  const categories = computed<ProductCategory[]>(() => categoriesQuery.data.value?.data ?? []);

  const totalCount = computed(() =>
    Number(productsQuery.data.value?.meta?.count ?? products.value.length),
  );

  const isLoading = computed(() => productsQuery.isPending.value);

  const error = computed(() => {
    const queryError = productsQuery.error.value;

    return queryError instanceof Error ? queryError.message : null;
  });

  const fetchProducts = async () => {
    await productsQuery.refetch();
  };

  const resetFilters = () => {
    filters.name = '';
    filters.category = '';
    filters.sortBy = 'name';
    filters.sortOrder = 'asc';
    debouncedName.value = '';
  };

  return {
    products,
    categories,
    totalCount,
    filters,
    isLoading,
    error,
    fetchProducts,
    resetFilters,
  };
};
