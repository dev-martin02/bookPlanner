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
      <button className="border-2 border-blue-500 text-blue-500 bg-white rounded-lg px-2 py-1  font-semibold transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {currentUser.name}
      </button>
    ) : (
      <Link
        to="/login"
        className="border-2 border-blue-500 text-blue-500 bg-white rounded-lg px-2 py-1  font-semibold transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
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
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-4xl font-bold flex gap-1 items-center justify-center text-blue-700 ">
          <BookMarked size={35} /> Book Planner
        </h1>
        {accountButton}
      </header>
      <div className="flex align-middle items-center justify-between">
        <span className="font-semibold text-xl text-blue-600 ">
          All your Books
        </span>
        <button
          className="border-2 px-2 py-1 w-40 rounded flex justify-between bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 delay-100"
          onClick={() => setDisplayForm(!displayForm)}
        >
          <BadgePlus /> Add New Book
        </button>
      </div>
      {displayForm && <AddBookForm setDisplayForm={setDisplayForm} />}
      <Book />
    </main>
  );
}
