import { useEffect, useState } from "react";
import { PlusCircle, Trash2, BookOpen, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useBookStore as useBookStore } from "../store/book.store";
import { AddNoteForm } from "./form/AddNoteForm";
import { AddChapterForm } from "./form/AddChapterForm";
import { getChapters } from "../api/SupaApi";

export default function OneBook() {
  const [showChapterForm, setShowChapterForm] = useState(false);
  const {
    books,
    generalNoteArr,
    deleteGeneralNote,
    bookChapters,
    setFetchedChapter,
    currentUser,
  } = useBookStore();
  const { id } = useParams<{ id: string }>();

  const bookId = id as string;
  //Notes
  const [showNoteForm, setShowNoteForm] = useState(false);
  const foundBook = books.find((book) => book.id === Number(bookId));
  const bookName = foundBook?.bookName || "Book not found";

  useEffect(() => {
    if (currentUser.name.length !== 0) {
      getChapters(Number(bookId))
        .then((response) => {
          if ("message" in response) {
            console.error(response.message);
          } else {
            setFetchedChapter(response);
          }
        })
        .catch((e) => console.error(e));
    }
  }, [bookId]);

  console.log(bookChapters);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
        <BookOpen className="w-8 h-8 mr-2" />
        {bookName}
      </h2>

      {/* <div className="mb-8">
        <img
          src="/api/placeholder/400/200"
          alt="Book cover"
          className="mx-auto rounded-lg shadow-md"
        />
      </div> */}

      <fieldset className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-100 mb-8">
        <legend className="text-2xl font-semibold text-blue-500 px-2">
          Chapters
        </legend>
        {!showChapterForm && (
          <button
            onClick={() => setShowChapterForm(!showChapterForm)}
            className=" mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add a Chapter
          </button>
        )}

        {showChapterForm && (
          <AddChapterForm
            book={bookId}
            setShowChapterForm={setShowChapterForm}
            showChapterForm={showChapterForm}
          />
        )}
        <div className="space-y-2">
          {bookChapters.map(({ chapterNum, chapterName, id }) => (
            <div
              key={id}
              className="flex justify-between items-center p-2 bg-white rounded shadow"
            >
              <h3 className="text-lg font-medium">{`${chapterNum}: ${chapterName}`}</h3>
              <Link
                to={`${id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
              >
                <Eye className="w-4 h-4 mr-1" />
                See Notes
              </Link>
            </div>
          ))}
        </div>
      </fieldset>

      {/* General Note Section  */}
      <section className="flex flex-col">
        <header className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold">
            General Notes about the book
          </h2>
          {!showNoteForm && (
            <button
              onClick={() => setShowNoteForm(!showNoteForm)}
              type="submit"
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center w-14 items-center p-2"
            >
              <PlusCircle className="w-5 h-5 " />
            </button>
          )}
        </header>
        {showNoteForm && (
          <AddNoteForm
            book={bookId}
            showNoteForm={showNoteForm}
            setShowNoteForm={setShowNoteForm}
          />
        )}

        <ul className="space-y-2 mt-5">
          {generalNoteArr
            .filter((book) => book.bookId === bookId)
            .map(({ note, id }) => (
              <li
                key={id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded"
              >
                <p>{note}</p>
                <button
                  onClick={() => deleteGeneralNote(id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
