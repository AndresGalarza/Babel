<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="close-modal">
        <span @click="closeModal">X</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const isVisible = ref(props.visible);

const closeModal = () => {
  isVisible.value = false;
  emit("update:visible", false);
};

watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = newVal;
  }
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  min-width: 320px;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
