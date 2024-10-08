<template>
  <div>
    <h2>Add New Location</h2>
    <form @submit.prevent="saveLocation">
      <Input v-model="location.room" label="Sala" />
      <Input v-model="location.shelf" label="Estante" />
      <Input v-model="location.bookcase" label="Librero" />
      <Input v-model="location.position" label="Posición" />
      <div class="flex gap-2 right">
        <Button type="submit">Save</Button>
        <Button @click="closeModal"> Close </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { LocationType, useLocations } from "../../composables/locations";
import Button from "../Button.vue";
import Input from "../Input.vue";
const locations = useLocations();

const emit = defineEmits(["closeModal"]);

const location = ref<LocationType>({
  room: "",
  shelf: "",
  bookcase: "",
  position: "",
});

const saveLocation = () => {
  locations.addLocation(location.value);
  emit("closeModal");
};

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.right {
  float: right;
}
</style>
