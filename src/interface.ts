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
  bookChapter: Array<Chapter>;
  addChapter: (chapter: Chapter) => void;
  chapterNoteArr: Array<ChapterNote>;
  addChapterNote: (note: ChapterNote) => void;
  deleteChapterNote: (id: string) => void;
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

export interface Account {
  name: string;
  email: string;
  password: string;
}

export interface ChapterNote {
  note: string;
  id: string;
  chapterId: string;
}
