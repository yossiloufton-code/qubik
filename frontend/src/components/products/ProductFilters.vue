<script setup lang="ts">
import { computed } from 'vue';
import BaseInput from '../shared/BaseInput.vue';
import BaseSelect from '../shared/BaseSelect.vue';
import type { ProductCategory } from '../../types/product';
import { formatCategory } from '../../utils/formatCategory';

interface Props {
  name: string;
  category: string;
  categories: ProductCategory[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:name': [value: string];
  'update:category': [value: string];
}>();

const categoryOptions = computed(() => [
  {
    label: 'All categories',
    value: '',
  },
  ...props.categories.map((category) => ({
    label: formatCategory(category),
    value: category,
  })),
]);
</script>

<template>
  <div class="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
    <BaseInput
      id="product-name-filter"
      label="Search by product name"
      :model-value="name"
      placeholder="Search e-books, courses..."
      @update:model-value="emit('update:name', $event)"
    />

    <BaseSelect
      id="product-category-filter"
      label="Category"
      :model-value="category"
      :options="categoryOptions"
      @update:model-value="emit('update:category', $event)"
    />
  </div>
</template>
