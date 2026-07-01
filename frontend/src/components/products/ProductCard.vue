<script setup lang="ts">
import type { ProductListItem } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatCategory } from '../../utils/formatCategory';

interface Props {
  product: ProductListItem;
}

defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="`/products/${product.id}`"
    class="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <img
      :src="product.thumbnailUrl"
      :alt="`${product.name} thumbnail`"
      class="h-44 w-full object-cover"
      loading="lazy"
    />

    <div class="space-y-3 p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {{ formatCategory(product.category) }}
          </p>
          <h2 class="mt-1 text-lg font-bold text-slate-950 group-hover:text-blue-700">
            {{ product.name }}
          </h2>
        </div>

        <p class="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-950">
          {{ formatCurrency(product.price) }}
        </p>
      </div>

      <p class="line-clamp-2 text-sm leading-6 text-slate-600">
        {{ product.shortDescription }}
      </p>
    </div>
  </RouterLink>
</template>
