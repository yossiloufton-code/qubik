<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../stores/cart.store';

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/products" class="text-lg font-bold text-slate-950">
        Digital Store
      </RouterLink>

      <nav aria-label="Main navigation" class="flex items-center gap-4">
        <RouterLink
          to="/products"
          class="text-sm font-medium text-slate-700 hover:text-slate-950"
        >
          Products
        </RouterLink>

        <RouterLink
          to="/cart"
          class="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          aria-label="Open shopping cart"
        >
          Cart
          <span class="ml-1 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-950">
            {{ totalItems }}
          </span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
