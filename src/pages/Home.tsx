import { useState } from "react";
import Book from "./Book";
import { AddBookForm } from "../form/AddBookForm";
import { BadgePlus, BookMarked } from "lucide-react";

export default function Home() {
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <main className="px-4 mt-5">
      <h1 className="text-4xl font-bold flex gap-1 items-center justify-center text-blue-700 ">
        <BookMarked size={35} /> Book Planner
      </h1>

      <span className="font-semibold text-2xl text-blue-600 ">
        All your Books
      </span>
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
