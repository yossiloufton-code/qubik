<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />

    <main class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
