<template>
  <div>
    <div class="flex gap-2">
      <Button @click="showAddBook">Add Book</Button>
      <Button @click="showAddLocation">Add Location</Button>
    </div>
    <Table class="top-1" v-if="!loading" :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <div class="flex gap-2">
          <Button @click="deleteBook(row.volume_id)">Delete</Button>
          <Button @click="editBook(row as BookType)">Edit</Button>
        </div>
      </template>
    </Table>
    <Loader v-else />
    <Modal :visible="isVisibleBookForm">
      <BookComponent
        :book="selectedBook"
        @closeModal="onCloseModal"
        @refresh="onRefresh"
      />
    </Modal>
    <Modal :visible="isVisibleLocationForm">
      <LocationComponent @closeModal="isVisibleLocationForm = false" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "../components/Button.vue";
import Loader from "../components/Loader.vue";
import Modal from "../components/Modal.vue";
import Table from "../components/Table.vue";
import BookComponent from "../components/forms/Book.vue";
import LocationComponent from "../components/forms/Locations.vue";
import { BookType, useBooks } from "../composables/books";

const books = useBooks();
const loading = ref(true);
const isVisibleBookForm = ref(false);
const isVisibleLocationForm = ref(false);
const selectedBook = ref<BookType | undefined>(undefined);

const headers = ref([
  { title: "ID", rowKey: "volume_id" },
  { title: "Title", rowKey: "title" },
  { title: "Cuarto", rowKey: "room" },
  { title: "Estante", rowKey: "shelf" },
  { title: "Librero", rowKey: "bookcase" },
  { title: "Posición", rowKey: "position" },
  { title: "", rowKey: "actions", useSlot: true },
]);

const onRefresh = async () => {
  await getBooksList();
};

const onCloseModal = () => {
  isVisibleBookForm.value = false;
};

const rows = ref<BookType[]>([]);

const getBooksList = async () => {
  loading.value = true;
  await books.getBooks();
  rows.value = books.books.value;
  loading.value = false;
};
// fetch books from API with compsable books on mounted
onMounted(async () => {
  await getBooksList();
});

const deleteBook = async (volume_id: string) => {
  loading.value = true;
  await books.deleteBook(volume_id);
  rows.value = books.books.value;
  loading.value = false;
};

const editBook = async (book: BookType) => {
  selectedBook.value = book;
  isVisibleBookForm.value = true;
};
const showAddBook = () => {
  selectedBook.value = undefined;
  isVisibleBookForm.value = true;
};

const showAddLocation = () => {
  isVisibleLocationForm.value = true;
};
</script>

<style scoped>
.flex {
  display: flex;
}
.gap-2 {
  gap: 0.5rem;
}
.top-1 {
  margin-top: 1rem;
}
</style>
