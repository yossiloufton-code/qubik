<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue: string;
  placeholder?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <label class="block" :for="id">
    <span class="mb-1 block text-sm font-medium text-slate-700">{{ label }}</span>
    <input
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
