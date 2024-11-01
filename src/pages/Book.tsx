import { useBookStore } from "../store/book.store";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function Book() {
  const { books } = useBookStore();

  const allBooks = books.map(({ bookName, author, id }) => (
    <div key={id} className="flex flex-col gap-1 border-2 rounded w-11/12 p-2">
      <h3 className="text-xl font-semibold">{bookName}</h3>
      <p>{author}</p>
      <div className=" flex flex-row-reverse">
        <Link
          to={`book/${id}`}
          className="px-2 py-1 flex gap-2 w-32 border-2 rounded bg-blue-500 text-white border-blue-500 hover:bg-blue-400 hover:border-blue-400 delay-75 "
        >
          <Eye /> See notes
        </Link>
      </div>
    </div>
  ));

  return books.length === 0 ? (
    <div className="flex justify-center items-center w-full mt-10">
      <p className="text-gray-700 text-xl ">
        You currently don't have any books! Would you like to add one?
      </p>
    </div>
  ) : (
    <section className="mt-5 flex flex-col items-center md:grid md:grid-cols-3 md:grid-rows-3 gap-3">
      {allBooks}
    </section>
  );
}
