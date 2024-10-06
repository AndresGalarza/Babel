<template>
  <div>
    <label>
      <div v-if="label">{{ label }}</div>
      <select v-model="selectedValue">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

interface Option {
  value: string | number;
  text: string;
}

const props = defineProps<{
  label?: string;
  options: Option[];
  modelValue?: string | number | null;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const selectedValue = ref(props.modelValue);

watch(selectedValue, (newValue: string | number | null | undefined) => {
  if (newValue !== null && newValue !== undefined) {
    emits("update:modelValue", newValue);
  }
});

watch(
  () => props.modelValue,
  (newValue: string | number | null | undefined) => {
    selectedValue.value = newValue;
  }
);
</script>

<style scoped>
/* Add your styles here */
select {
  width: 100%;
  max-width: 320px;
  padding: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
