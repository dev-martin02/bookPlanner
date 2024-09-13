export interface Note {
  id: string;
  note: string;
  bookId: string;
}

export type storeObj = {
  currentAvaibleBookID: number;
  books: Array<Book> | [];
  addBook: (newBook: Book) => void;
  incrementId: () => void;
  generalNoteArr: Array<Note>;
  addGeneralNote: (note: Note) => void;
  deleteGenralNote: (id: string) => void;
  bookChapters: Array<Chapter>;
  addChapter: (chapter: Chapter) => void;
};

export type Book = {
  bookName: string;
  author: string;
  id: number;
};

export type Chapter = {
  chapterNum: string;
  chapterName: string;
  id: string;
  bookId: string;
};
