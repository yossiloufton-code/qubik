<script setup lang="ts">
import Card from 'primevue/card';
import Tag from 'primevue/tag';
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
    class="group block h-full rounded-[1.6rem] transition duration-200 hover:-translate-y-1 focus-visible:outline-none"
  >
    <Card class="h-full overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-200 group-hover:shadow-2xl group-hover:shadow-slate-950/10">
      <template #header>
        <div class="relative overflow-hidden bg-slate-100">
          <img
            :src="product.thumbnailUrl"
            :alt="`${product.name} thumbnail`"
            class="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div class="absolute left-4 top-4">
            <Tag :value="formatCategory(product.category)" severity="info" />
          </div>

          <div class="absolute bottom-4 right-4 rounded-2xl bg-white/95 px-3 py-2 text-sm font-black text-slate-950 shadow-lg backdrop-blur">
            {{ formatCurrency(product.price) }}
          </div>
        </div>
      </template>

      <template #title>
        <h2 class="line-clamp-2 text-xl font-black leading-tight tracking-tight text-slate-950 group-hover:text-blue-700">
          {{ product.name }}
        </h2>
      </template>

      <template #content>
        <p class="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">
          {{ product.shortDescription }}
        </p>
      </template>

      <template #footer>
        <div class="flex items-center justify-between border-t border-slate-100 pt-4">
          <span class="text-sm font-semibold text-slate-500">View details</span>
          <span class="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white transition group-hover:bg-blue-700">
            <i class="pi pi-arrow-right text-sm" aria-hidden="true" />
          </span>
        </div>
      </template>
    </Card>
  </RouterLink>
</template>
