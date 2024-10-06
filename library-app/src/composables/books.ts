import { ref } from "vue";
import Book from "../views/Book.vue";

interface Book {
  volume_id?: string | null;
  volume_number: number | null;
  title: string;
  location_id?: number | null;
  // location details
  room?: string;
  shelf?: string;
  bookcase?: string;
  position?: string;
}

const BASE_URL = "http://localhost:3000";

export function useBooks() {
  const books = ref<Book[]>([]);
  const error = ref<string | null>(null);

  const getBooks = async (): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/books`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Book[] = await response.json();
      books.value = data;
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const getBook = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/books/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Book = await response.json();
      books.value = [data];
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const addBook = async (book: Book): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Book = await response.json();
      books.value.push(data);
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const deleteBook = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      books.value = books.value.filter((book) => book.volume_id !== id);
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const updateBook = async (id: string, book: Book): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Book = await response.json();
      books.value = books.value.map((b) => (b.volume_id === id ? data : b));
    } catch (err: any) {
      error.value = err.message;
    }
  };

  return {
    books,
    error,
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook,
  };
}

export type { Book as BookType };
