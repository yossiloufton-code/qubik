<script setup lang="ts">
import Card from 'primevue/card';
import { formatCurrency } from '../../utils/formatCurrency';
import BaseButton from '../shared/BaseButton.vue';

interface Props {
  totalItems: number;
  totalPrice: number;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  checkout: [];
  clear: [];
}>();
</script>

<template>
  <Card class="sticky top-24 border border-slate-200 shadow-2xl shadow-slate-950/10">
    <template #title>
      Order summary
    </template>

    <template #content>
      <dl class="space-y-4 text-sm">
        <div class="flex justify-between rounded-2xl bg-slate-50 p-4">
          <dt class="font-semibold text-slate-600">Items</dt>
          <dd class="font-black text-slate-950">{{ totalItems }}</dd>
        </div>

        <div class="flex justify-between rounded-2xl bg-slate-950 p-4 text-white">
          <dt class="font-bold">Total</dt>
          <dd class="text-2xl font-black">
            {{ formatCurrency(totalPrice) }}
          </dd>
        </div>
      </dl>

      <div class="mt-6 grid gap-3">
        <BaseButton class="w-full" :disabled="disabled || totalItems === 0" @click="emit('checkout')">
          <span class="inline-flex items-center gap-2">
            <i class="pi pi-credit-card" aria-hidden="true" />
            Mock checkout
          </span>
        </BaseButton>

        <BaseButton
          class="w-full"
          variant="secondary"
          :disabled="disabled || totalItems === 0"
          @click="emit('clear')"
        >
          Clear cart
        </BaseButton>
      </div>

      <p class="mt-4 text-center text-xs leading-5 text-slate-500">
        This is a mock checkout flow. No real payment is processed.
      </p>
    </template>
  </Card>
</template>
