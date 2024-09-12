import { bookStore } from "../store/book.store";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function Book() {
  const { books } = bookStore();

  const allBooks = books.map(({ bookName, author, id }) => (
    <div key={id} className="flex flex-col gap-1 border-2 rounded w-11/12 p-2">
      <h3 className="text-xl font-semibold">{bookName}</h3>
      <p>{author}</p>
      <div className=" flex flex-row-reverse">
        <Link
          to={`book/${id}`}
          className="px-2 py-1 flex gap-2 w-32 border-2 rounded bg-blue-500 text-white border-blue-500 hover:bg-blue-400 hover:border-blue-400  "
        >
          <Eye /> See notes
        </Link>
      </div>
    </div>
  ));

  return (
    <section className="mt-5 flex flex-col items-center md:grid md:grid-cols-3 md:grid-rows-3 gap-3">
      {books.length === 0 ? (
        <p>Your currently don't have any books! Would you like to add it?</p>
      ) : (
        allBooks
      )}
    </section>
  );
}

/*
  Create a section where the user can write their chapter name and also sub-chapters, they can write what they learn from both of them, induvidually but also can make a summary or a note of chapter
*/
