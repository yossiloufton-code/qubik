<script setup lang="ts">
import type { CartItem } from '../../types/cart';
import { formatCurrency } from '../../utils/formatCurrency';
import BaseButton from '../shared/BaseButton.vue';
import QuantitySelector from './QuantitySelector.vue';

interface Props {
  item: CartItem;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  updateQuantity: [productId: string, quantity: number];
  remove: [productId: string];
}>();
</script>

<template>
  <article class="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[96px_1fr_auto] sm:items-center">
    <img
      :src="item.thumbnailUrl"
      :alt="`${item.name} thumbnail`"
      class="h-24 w-24 rounded-xl object-cover"
    />

    <div>
      <h2 class="font-bold text-slate-950">{{ item.name }}</h2>
      <p class="mt-1 text-sm text-slate-600">
        {{ formatCurrency(item.price) }} each
      </p>

      <div class="mt-4 flex flex-wrap items-center gap-3">
        <QuantitySelector
          :quantity="item.quantity"
          :disabled="disabled"
          @change="emit('updateQuantity', item.productId, $event)"
        />

        <BaseButton
          variant="secondary"
          :disabled="disabled"
          @click="emit('remove', item.productId)"
        >
          Remove
        </BaseButton>
      </div>
    </div>

    <p class="text-lg font-bold text-slate-950">
      {{ formatCurrency(item.price * item.quantity) }}
    </p>
  </article>
</template>
