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
  <Card class="border border-slate-200 shadow-sm">
    <template #title>
      Order summary
    </template>

    <template #content>
      <dl class="space-y-3 text-sm">
        <div class="flex justify-between">
          <dt class="text-slate-600">Items</dt>
          <dd class="font-semibold text-slate-950">{{ totalItems }}</dd>
        </div>

        <div class="flex justify-between border-t border-slate-200 pt-3">
          <dt class="font-semibold text-slate-950">Total</dt>
          <dd class="text-xl font-bold text-slate-950">
            {{ formatCurrency(totalPrice) }}
          </dd>
        </div>
      </dl>

      <div class="mt-6 grid gap-3">
        <BaseButton :disabled="disabled || totalItems === 0" @click="emit('checkout')">
          Mock checkout
        </BaseButton>

        <BaseButton
          variant="secondary"
          :disabled="disabled || totalItems === 0"
          @click="emit('clear')"
        >
          Clear cart
        </BaseButton>
      </div>
    </template>
  </Card>
</template>
