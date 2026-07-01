import { onMounted, reactive, ref, watch } from 'vue';
import { productService } from '../services/productService';
import type { ProductCategory, ProductFilters, ProductListItem } from '../types/product';
import { useApiRequest } from './useApiRequest';

export const useProducts = () => {
  const products = ref<ProductListItem[]>([]);
  const categories = ref<ProductCategory[]>([]);
  const totalCount = ref(0);

  const filters = reactive<ProductFilters>({
    name: '',
    category: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const { isLoading, error, run } = useApiRequest();

  let searchTimer: number | undefined;

  const fetchProducts = async () => {
    const response = await run(() => productService.getProducts(filters));

    if (!response) {
      products.value = [];
      totalCount.value = 0;
      return;
    }

    products.value = response.data;
    totalCount.value = Number(response.meta?.count ?? response.data.length);
  };

  const fetchCategories = async () => {
  try {
    const response = await productService.getCategories();
    categories.value = response.data;
  } catch {
    categories.value = [];
  }
};

  const resetFilters = () => {
    filters.name = '';
    filters.category = '';
    filters.sortBy = 'name';
    filters.sortOrder = 'asc';
  };

  watch(
    filters,
    () => {
      window.clearTimeout(searchTimer);

      searchTimer = window.setTimeout(() => {
        void fetchProducts();
      }, 250);
    },
    { deep: true },
  );

  onMounted(() => {
    void fetchProducts();
    void fetchCategories();
  });

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
