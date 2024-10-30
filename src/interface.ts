export interface Note {
  id: string;
  note: string;
  bookId: string;
}

export type storeObj = {
  currentAvailableBookID: number;
  books: Array<Book> | [];
  addBook: (newBook: Book) => void;
  incrementId: () => void;
  generalNoteArr: Array<Note>;
  addGeneralNote: (note: Note) => void;
  deleteGeneralNote: (id: string) => void;
  bookChapters: Array<Chapter>;
  addChapter: (chapter: Chapter) => void;
  setFetchedChapter: (chapterArr: Array<Chapter>) => void;
  chapterNoteArr: Array<ChapterNote>;
  addChapterNote: (note: ChapterNote) => void;
  deleteChapterNote: (id: string) => void;
  currentUser: userInfo;
  setCurrentUser: (userName: userInfo) => void;
  setFetchedBooks: (book: Array<Book>) => void;
};

export type Book = {
  bookName: string;
  author: string;
  userId: string;
  id: number;
};

export type Chapter = {
  chapterNum: string;
  chapterName: string;
  id: number;
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

export interface userInfo {
  created_at: string;
  email: string;
  id: string;
  name: string;
}
