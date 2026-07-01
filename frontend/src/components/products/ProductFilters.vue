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
  <section class="page-panel rounded-3xl p-5">
    <div class="mb-4 flex items-center gap-3">
      <span class="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-blue-700">
        <i class="pi pi-filter" aria-hidden="true" />
      </span>

      <div>
        <h2 class="text-base font-black text-slate-950">Find your product</h2>
        <p class="text-sm text-slate-500">
          Search by name or narrow results by category.
        </p>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-[1.5fr_1fr]">
      <BaseInput
        id="product-name-filter"
        label="Product name"
        :model-value="name"
        placeholder="Search e-books, courses, templates..."
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
  </section>
</template>
