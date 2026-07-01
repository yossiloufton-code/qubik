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
  <section class="space-y-8">
    <section class="hero-gradient overflow-hidden rounded-[2rem] px-6 py-10 text-white shadow-2xl shadow-blue-950/20 sm:px-10 lg:px-12">
      <div class="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 ring-1 ring-white/15">
            <i class="pi pi-sparkles" aria-hidden="true" />
            Digital products marketplace
          </p>

          <h1 class="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Build faster with curated digital products.
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Browse practical e-books, software licenses, templates, and online courses.
            Filter and sort products directly through the backend API.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#products-section" class="rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50">
              Browse products
            </a>

            <RouterLink to="/cart" class="rounded-xl border border-white/25 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
              View cart
            </RouterLink>
          </div>
        </div>

        <div class="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-2xl bg-white/95 p-4 text-slate-950">
              <p class="text-3xl font-black">{{ totalCount }}</p>
              <p class="mt-1 text-sm font-semibold text-slate-500">Products found</p>
            </div>

            <div class="rounded-2xl bg-white/95 p-4 text-slate-950">
              <p class="text-3xl font-black">4</p>
              <p class="mt-1 text-sm font-semibold text-slate-500">Categories</p>
            </div>

            <div class="col-span-2 rounded-2xl bg-white/95 p-4 text-slate-950">
              <p class="text-sm font-bold text-slate-500">Server-side capabilities</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Filtering</span>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Sorting</span>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">REST API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ProductFilters
      :name="filters.name ?? ''"
      :category="filters.category ?? ''"
      :categories="categories"
      @update:name="filters.name = $event"
      @update:category="updateCategory"
    />

    <section id="products-section" class="space-y-5">
      <div class="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur md:flex-row md:items-end">
        <div>
          <p class="text-sm font-bold uppercase tracking-wide text-blue-700">
            Catalog
          </p>
          <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-950">
            Available products
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Showing <strong class="text-slate-950">{{ totalCount }}</strong> matching products.
          </p>
        </div>

        <div class="grid gap-4 md:min-w-[26rem]">
          <ProductSortSelect
            :sort-by="filters.sortBy ?? 'name'"
            :sort-order="filters.sortOrder ?? 'asc'"
            @update:sort-by="updateSortBy"
            @update:sort-order="updateSortOrder"
          />

          <Button
            label="Reset filters"
            icon="pi pi-refresh"
            severity="secondary"
            outlined
            class="justify-center"
            @click="resetFilters"
          />
        </div>
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

      <section v-else class="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <span class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
          <i class="pi pi-search text-xl" aria-hidden="true" />
        </span>
        <h2 class="mt-4 text-2xl font-black text-slate-950">No products found</h2>
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          Try changing the product name or category filter.
        </p>
      </section>
    </section>
  </section>
</template>
