<script setup lang="ts">
import type { ProductListItem } from '../../types/product';
import ProductCard from './ProductCard.vue';

interface Props {
  products: ProductListItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
