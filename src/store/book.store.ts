import { create } from "zustand";
import { storeObj } from "../interface";

export const bookStore = create<storeObj>((set) => ({
  currentAvaibleBookID: 1,
  incrementId: () =>
    set((state) => ({ currentAvaibleBookID: state.currentAvaibleBookID + 1 })),

  books: [],
  addBook: (newBook) =>
    set((state) => ({
      books: [...state.books, newBook],
    })),

  generalNoteArr: [],
  addGeneralNote: (newNote) =>
    set((state) => ({
      generalNoteArr: [...state.generalNoteArr, newNote],
    })),
  deleteGenralNote: (id) =>
    set((state) => ({
      generalNoteArr: state.generalNoteArr.filter((note) => note.id !== id),
    })),

  bookChapter: [],
  addChapter: (chapter) =>
    set((state) => ({
      bookChapter: [...state.bookChapter, chapter],
    })),

  chapterNoteArr: [],
  addChapterNote: (note) =>
    set((state) => ({
      chapterNoteArr: [...state.chapterNoteArr, note],
    })),
  deleteChapterNote: (id) =>
    set((state) => ({
      chapterNoteArr: state.chapterNoteArr.filter((note) => note.id !== id),
    })),
}));
