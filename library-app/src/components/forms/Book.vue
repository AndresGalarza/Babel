<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <Input v-model="form.volume_number" type="number" label="Volume" />
      <Input v-model="form.title" label="Name" />
      <SelectComponent
        v-model="form.location_id"
        label="Ubicación"
        :options="locationsList"
      />
      <div class="flex gap-2 right">
        <Button type="submit">Save</Button>
        <Button @click="closeModal"> Close </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, ref } from "vue";
import { BookType, useBooks } from "../../composables/books";
import { useLocations } from "../../composables/locations";
import Button from "../Button.vue";
import Input from "../Input.vue";
import SelectComponent from "../Select.vue";
const locations = useLocations();
const books = useBooks();

const emit = defineEmits(["closeModal", "refresh"]);

const props = defineProps<{
  book?: BookType;
}>();

const locationsList = ref<{ value: any; text: any }[]>([]);

const form = ref<BookType>({
  volume_id: null,
  volume_number: null,
  title: "",
  location_id: null,
});

const handleSubmit = async () => {
  // Add your form submission logic here
  if (form.value.volume_id) {
    await books.updateBook(form.value.volume_id, form.value);
  } else {
    await books.addBook(form.value);
  }
  emit("refresh");
  emit("closeModal");
};

const closeModal = () => {
  emit("closeModal");
};

onMounted(async () => {
  if (props.book?.volume_id) {
    form.value = {
      volume_id: props.book.volume_id,
      volume_number: props.book.volume_number,
      title: props.book.title,
      location_id: props.book.location_id,
    };
  }
  await locations.getLocations();
  locationsList.value = locations.locations.value.map((location) => ({
    value: location.location_id,
    text: `${location.room} - ${location.shelf} - ${location.bookcase}`,
  }));
});
</script>

<style scoped>
/* Add your styles here */
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
