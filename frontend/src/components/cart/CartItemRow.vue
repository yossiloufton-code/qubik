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
  <article class="soft-card grid gap-4 rounded-3xl p-4 sm:grid-cols-[112px_1fr_auto] sm:items-center">
    <img
      :src="item.thumbnailUrl"
      :alt="`${item.name} thumbnail`"
      class="h-28 w-28 rounded-2xl object-cover shadow-sm"
    />

    <div>
      <h2 class="text-lg font-black tracking-tight text-slate-950">{{ item.name }}</h2>
      <p class="mt-1 text-sm font-semibold text-slate-500">
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
          <span class="inline-flex items-center gap-2">
            <i class="pi pi-trash" aria-hidden="true" />
            Remove
          </span>
        </BaseButton>
      </div>
    </div>

<div class="rounded-2xl bg-slate-50 p-4 text-left sm:text-right">      <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Subtotal</p>
      <p class="mt-1 text-xl font-black text-slate-950">
        {{ formatCurrency(item.price * item.quantity) }}
      </p>
    </div>
  </article>
</template>
