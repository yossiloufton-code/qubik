<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Badge from 'primevue/badge';
import { useCartStore } from '../../stores/cart.store';

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-white/60 bg-white/85 shadow-sm backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/products" class="flex items-center gap-3">
        <span class="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/20">
          Q
        </span>

        <span>
          <span class="block text-base font-black tracking-tight text-slate-950">
            Qubik Store
          </span>
          <span class="hidden text-xs font-medium text-slate-500 sm:block">
            Premium digital products
          </span>
        </span>
      </RouterLink>

      <nav aria-label="Main navigation" class="flex items-center gap-2 sm:gap-3">
        <RouterLink
          to="/products"
          class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
          active-class="bg-slate-100 text-slate-950"
        >
          Products
        </RouterLink>

        <RouterLink
          to="/cart"
          class="relative inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
          aria-label="Open shopping cart"
        >
          <i class="pi pi-shopping-cart text-sm" aria-hidden="true" />
          <span>Cart</span>

          <Badge
            v-if="totalItems > 0"
            :value="totalItems"
            severity="info"
            class="absolute -right-2 -top-2"
          />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
