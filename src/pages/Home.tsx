import { useEffect, useState } from "react";
import Book from "./Book";
import { AddBookForm } from "../components/form/AddBookForm";
import { BadgePlus, BookMarked } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/book.store";
import { getUserBook } from "../api/SupaApi";

export default function Home() {
  const { currentUser, setFetchedBooks } = useBookStore();

  const accountButton =
    currentUser.name.length !== 0 ? (
      <button>{currentUser.name}</button>
    ) : (
      <Link to={"/login"} className="border-2 rounded px-2 py-1 ">
        Login
      </Link>
    );

  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    if (currentUser.id.length !== 0) {
      getUserBook(currentUser.id)
        //@ts-ignore
        .then((userBook) => setFetchedBooks(userBook))
        .catch((e) => alert(e));
    }
  }, [currentUser]);
  return (
    <main className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold flex gap-1 items-center justify-center text-blue-700 ">
        <BookMarked size={35} /> Book Planner
      </h1>
      <header className="flex justify-between items-center mt-7">
        <span className="font-semibold text-2xl text-blue-600 ">
          All your Books
        </span>
        {accountButton}
      </header>
      <button
        className="border-2 mt-4 px-2 py-1 w-40 rounded flex justify-between bg-green-500 text-white border-green-500"
        onClick={() => setDisplayForm(!displayForm)}
      >
        <BadgePlus /> Add New Book
      </button>
      {displayForm && <AddBookForm setDisplayForm={setDisplayForm} />}
      <Book />
    </main>
  );
}
