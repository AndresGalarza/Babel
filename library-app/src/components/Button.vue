<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
