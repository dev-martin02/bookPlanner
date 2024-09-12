import { FormEvent, useState } from "react";
import { PlusCircle, Trash2, BookOpen, Eye } from "lucide-react";
import { useParams } from "react-router-dom";
import { bookStore } from "../store/book.store";

type Chapters = {
  chapterNum: string;
  chapterName: string;
  id: string;
};

type Note = {
  noteText: string;
  id: string;
};

export default function OneBook() {
  const [chapterArr, setChapterArr] = useState([]);
  const [showChapterForm, setShowChapterForm] = useState(false);
  const { books } = bookStore();
  const { id } = useParams();

  //Notes
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [notesArr, setNotesArr] = useState([]);

  const deleteNote = (id: number) => {
    //@ts-ignore
    const newArr = notesArr.filter((note) => note.id !== id);
    setNotesArr(newArr);
  };
  function handleForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const chapter: Chapters = {
      chapterNum: "",
      chapterName: "",
      id: "",
    };

    for (const value of formData.entries()) {
      //@ts-ignore
      chapter[value[0]] = value[1];
    }
    chapter["id"] = chapter["chapterNum"];
    //@ts-ignore
    setChapterArr((prevState) => [...prevState, chapter]);
  }
  const addChapterForm = () => {
    return (
      <form
        onSubmit={handleForm}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="space-y-9">
          <div className="relative">
            <input
              type="number"
              name="chapterNum"
              id="chapterNum"
              placeholder=" "
              className="peer mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-transparent"
            />
            <label
              htmlFor="chapterNum"
              className="absolute left-2 -top-6 text-sm transition-all font-medium text-gray-700
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-gray-600
                        peer-focus:text-sm"
            >
              Chapter Number
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="chapterName"
              id="chapterName"
              placeholder=" "
              className="peer mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-transparent"
            />
            <label
              htmlFor="chapterName"
              className="absolute left-2 -top-6 text-sm transition-all font-medium text-gray-700
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-gray-600
                        peer-focus:text-sm"
            >
              Chapter Name
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Chapter
        </button>
      </form>
    );
  };

  function handleNoteForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const note: Note = {
      noteText: "",
      id: "",
    };

    for (const value of formData.entries()) {
      //@ts-ignore
      note[value[0]] = value[1];
    }
    note["id"] = crypto.randomUUID();
    //@ts-ignore
    setNotesArr((prevState) => [...prevState, note]);
  }

  const addNote = () => {
    return (
      <form onSubmit={handleNoteForm} className="mt-8 space-y-2">
        <div className="relative">
          <input
            type="text"
            name="noteText"
            placeholder="Note"
            className="peer mt-1 block w-full rounded-md border-2 p-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-transparent"
          />
          <label
            className="absolute left-2 -top-6 text-gray-600 text-sm transition-all 
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                       peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-gray-600 
                       peer-focus:text-sm"
          >
            Note
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add
        </button>
      </form>
    );
  };
  //@ts-ignore
  const { bookName } = books.find((book) => book.id === Number(id));

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
        <button
          onClick={() => setShowChapterForm(!showChapterForm)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add a chapter
        </button>
        {showChapterForm && addChapterForm()}
        <div className="space-y-2">
          {chapterArr.map(({ chapterNum, chapterName, id }) => (
            <div
              key={id}
              className="flex justify-between items-center p-2 bg-white rounded shadow"
            >
              <h3 className="text-lg font-medium">{`${chapterNum}: ${chapterName}`}</h3>
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                See Notes
              </button>
            </div>
          ))}
        </div>
      </fieldset>

      <h2 className="text-xl font-semibold mb-4">
        General Notes about the book
      </h2>
      <button
        onClick={() => setShowNoteForm(!showNoteForm)}
        className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Note
      </button>
      {showNoteForm && addNote()}
      <ul className="space-y-2">
        {notesArr.map(({ noteText, id }) => (
          <li
            key={id}
            className="flex justify-between items-center p-2 bg-gray-100 rounded"
          >
            <p>{noteText}</p>
            <button
              onClick={() => deleteNote(id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
