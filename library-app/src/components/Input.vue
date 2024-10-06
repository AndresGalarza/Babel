<template>
  <div>
    <label>
      <div v-if="label">{{ label }}</div>
      <input :type="type" v-model="inputValue" @input="updateValue" />
    </label>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch } from "vue";

const props = defineProps<{
  label?: string;
  type?: string | "text";
  modelValue: string | number | null;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputValue = ref(props.modelValue);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits("update:modelValue", target.value);
};

watch(
  () => props.modelValue,
  (newValue: string | number | null | undefined) => {
    inputValue.value = newValue !== undefined ? newValue : null;
  }
);
</script>

<style scoped>
/* Add your styles here */
input {
  width: 100%;
  max-width: 320px;
  padding: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
