<script setup lang="ts">
import BaseButton from './BaseButton.vue';

interface Props {
  title?: string;
  message: string;
  retryLabel?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  retryLabel: 'Try again',
});

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <section class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
    <h2 class="text-lg font-bold">{{ title }}</h2>
    <p class="mt-2 text-sm">{{ message }}</p>

    <BaseButton class="mt-4" variant="secondary" @click="emit('retry')">
      {{ retryLabel }}
    </BaseButton>
  </section>
</template>
