<script setup lang="ts">
import Button from 'primevue/button';
import ProductFilters from '../components/products/ProductFilters.vue';
import ProductGrid from '../components/products/ProductGrid.vue';
import ProductSkeletonCard from '../components/products/ProductSkeletonCard.vue';
import ProductSortSelect from '../components/products/ProductSortSelect.vue';
import BaseErrorState from '../components/shared/BaseErrorState.vue';
import { useProducts } from '../composables/useProducts';
import type { ProductCategory, ProductSortBy, SortOrder } from '../types/product';

const {
  products,
  categories,
  totalCount,
  filters,
  isLoading,
  error,
  fetchProducts,
  resetFilters,
} = useProducts();

const updateCategory = (category: string) => {
  filters.category = category as ProductCategory | '';
};

const updateSortBy = (sortBy: ProductSortBy) => {
  filters.sortBy = sortBy;
};

const updateSortOrder = (sortOrder: SortOrder) => {
  filters.sortOrder = sortOrder;
};
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Digital products
        </p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Browse products
        </h1>
        <p class="mt-2 max-w-2xl text-slate-600">
          Discover e-books, software licenses, templates, and online courses.
        </p>
      </div>

      <Button label="Reset filters" severity="secondary" outlined @click="resetFilters" />
    </div>

    <ProductFilters
      :name="filters.name ?? ''"
      :category="filters.category ?? ''"
      :categories="categories"
      @update:name="filters.name = $event"
      @update:category="updateCategory"
    />

    <div class="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-end">
      <p class="text-sm text-slate-600">
        Showing <strong class="text-slate-950">{{ totalCount }}</strong> products
      </p>

      <ProductSortSelect
        :sort-by="filters.sortBy ?? 'name'"
        :sort-order="filters.sortOrder ?? 'asc'"
        @update:sort-by="updateSortBy"
        @update:sort-order="updateSortOrder"
      />
    </div>

    <BaseErrorState
      v-if="error"
      :message="error"
      @retry="fetchProducts"
    />

    <div v-else-if="isLoading" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <ProductSkeletonCard v-for="index in 6" :key="index" />
    </div>

    <ProductGrid v-else-if="products.length" :products="products" />

    <section v-else class="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 class="text-xl font-bold text-slate-950">No products found</h2>
      <p class="mt-2 text-sm text-slate-600">
        Try changing the product name or category filter.
      </p>
    </section>
  </section>
</template>
