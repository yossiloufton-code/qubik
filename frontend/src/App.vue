<script setup lang="ts">
import { onMounted } from 'vue';
import AppLayout from './components/layout/AppLayout.vue';
import { useCartStore } from './stores/cart.store';

const cartStore = useCartStore();

onMounted(() => {
  void cartStore.loadCart();
});
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
