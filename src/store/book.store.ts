import { create } from "zustand";
import { storeObj } from "../interface";

export const useBookStore = create<storeObj>((set) => ({
  currentAvaibleBookID: 1,
  incrementId: () =>
    set((state) => ({ currentAvaibleBookID: state.currentAvaibleBookID + 1 })),

  books: [],
  addBook: (newBook) =>
    set((state) => ({
      books: [...state.books, newBook],
    })),
  setFetchedBooks: (userBook) => set(() => ({ books: userBook })),

  generalNoteArr: [],
  addGeneralNote: (newNote) =>
    set((state) => ({
      generalNoteArr: [...state.generalNoteArr, newNote],
    })),
  deleteGeneralNote: (id) =>
    set((state) => ({
      generalNoteArr: state.generalNoteArr.filter((note) => note.id !== id),
    })),

  bookChapters: [],
  addChapter: (chapter) =>
    set((state) => ({
      bookChapters: [...state.bookChapters, chapter],
    })),
  setFetchedChapter: (chapterArr) => set(() => ({ bookChapters: chapterArr })),

  chapterNoteArr: [],
  addChapterNote: (note) =>
    set((state) => ({
      chapterNoteArr: [...state.chapterNoteArr, note],
    })),
  deleteChapterNote: (id) =>
    set((state) => ({
      chapterNoteArr: state.chapterNoteArr.filter((note) => note.id !== id),
    })),

  currentUser: {
    created_at: "",
    email: "",
    id: "",
    name: "",
  },
  setCurrentUser: (userName) => set(() => ({ currentUser: userName })),
}));
