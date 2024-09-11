import { create } from "zustand";

type storeObj = {
  currentAvaibleBookID: number;
  books: Array<Book> | [];
  addBook: (newBook: Book) => void;
  incrementId: () => void;
  noteArr: Array<Note> | string;
  addNote: (id: number, note: string) => void;
};

type Book = {
  bookName: string;
  author: string;
  id: number;
};

type Note = {
  id: number;
  note: string;
};

export const bookStore = create<storeObj>((set) => ({
  currentAvaibleBookID: 1,
  incrementId: () =>
    set((state) => ({ currentAvaibleBookID: state.currentAvaibleBookID + 1 })),
  books: [],
  addBook: (newBook) =>
    set((state) => ({
      books: [...state.books, newBook],
    })),

  noteArr: [],
  addNote: (bookId, newNote) =>
    set((state) => ({
      noteArr: state.books.map(({ id }) => id === bookId),
    })),
}));
