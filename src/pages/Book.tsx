import { bookStore } from "../store/book.store";
import { Link } from "react-router-dom";

export default function Book() {
  const { books } = bookStore();

  const allBooks = books.map(({ bookName, author, id }) => (
    <div key={id} className="flex flex-col gap-1 border-2 rounded w-1/4">
      <h3 className="text-xl font-semibold">{bookName}</h3>
      <p>{author}</p>
      <Link to={"onebook"}>See notes</Link>
    </div>
  ));

  return (
    <section className="mt-5">
      {books.length === 0 ? (
        <p>Your currently don't have any books!, Would you like to add it?</p>
      ) : (
        allBooks
      )}
    </section>
  );
}

/*
  Create a section where the user can write their chapter name and also sub-chapters, they can write what they learn from both of them, induvidually but also can make a summary or a note of chapter
*/
