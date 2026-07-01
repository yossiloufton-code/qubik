<script setup lang="ts">
import BaseSelect from '../shared/BaseSelect.vue';
import type { ProductSortBy, SortOrder } from '../../types/product';

interface Props {
  sortBy: ProductSortBy;
  sortOrder: SortOrder;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:sortBy': [value: ProductSortBy];
  'update:sortOrder': [value: SortOrder];
}>();
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <BaseSelect
      id="sort-by"
      label="Sort by"
      :model-value="sortBy"
      :options="[
        { label: 'Name', value: 'name' },
        { label: 'Price', value: 'price' },
      ]"
      @update:model-value="emit('update:sortBy', $event as ProductSortBy)"
    />

    <BaseSelect
      id="sort-order"
      label="Order"
      :model-value="sortOrder"
      :options="[
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' },
      ]"
      @update:model-value="emit('update:sortOrder', $event as SortOrder)"
    />
  </div>
</template>
