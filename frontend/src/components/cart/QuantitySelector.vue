<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

interface Props {
  quantity: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  change: [quantity: number];
}>();

const decrease = () => {
  emit('change', props.quantity - 1);
};

const increase = () => {
  emit('change', props.quantity + 1);
};

const updateFromInput = (value: number | null) => {
  if (typeof value === 'number' && Number.isInteger(value)) {
    emit('change', value);
  }
};
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <Button
      type="button"
      icon="pi pi-minus"
      size="small"
      severity="secondary"
      outlined
      :disabled="disabled"
      aria-label="Decrease quantity"
      @click="decrease"
    />

    <InputNumber
      :model-value="quantity"
      :disabled="disabled"
      :min="1"
      input-id="cart-item-quantity"
      input-class="w-16 text-center"
      :use-grouping="false"
      aria-label="Product quantity"
      @update:model-value="updateFromInput"
    />

    <Button
      type="button"
      icon="pi pi-plus"
      size="small"
      severity="secondary"
      outlined
      :disabled="disabled"
      aria-label="Increase quantity"
      @click="increase"
    />
  </div>
</template>
