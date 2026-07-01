<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

interface Props {
  id: string;
  label: string;
  modelValue: string;
  options: Option[];
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <label class="block" :for="id">
    <span class="mb-1 block text-sm font-medium text-slate-700">{{ label }}</span>
    <select
      :id="id"
      :value="modelValue"
      class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
