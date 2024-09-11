import { useState } from "react";
import Book from "./Book";
import { AddBookForm } from "../form/AddBookForm";

export default function Home() {
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <main className="px-4">
      <h1 className="text-2xl font-semibold flex justify-center ">
        Book Planner
      </h1>
      <span className="mr-3 font-semibold text-xl">All your Books</span>
      <button
        className="border-2 px-2 py-1 w-32 rounded"
        onClick={() => setDisplayForm(!displayForm)}
      >
        Add New Book
      </button>
      {displayForm && <AddBookForm setDisplayForm={setDisplayForm} />}
      <Book />
    </main>
  );
}
