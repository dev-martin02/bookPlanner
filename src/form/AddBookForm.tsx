import React, { FormEvent } from "react";
import { bookStore } from "../store/book.store";

interface AddBookFormProps {
  setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddBookForm: React.FC<AddBookFormProps> = ({ setDisplayForm }) => {
  const { addBook, currentAvaibleBookID, incrementId } = bookStore();

  function handleForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    type formObj = {
      bookName: string;
      author: string;
      id: number;
    };

    const value: formObj = {
      bookName: "",
      author: "",
      id: 0,
    };

    for (const name of formData.entries()) {
      //@ts-ignore
      value[name[0] as keyof formObj] = name[1];
    }
    value["id"] = currentAvaibleBookID;
    incrementId();
    addBook(value);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="absolute top-3 left-5 ">
        <button
          className="font-bold text-white text-xl"
          onClick={() => setDisplayForm(false)}
        >
          X
        </button>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-blue-200 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
            New Book Form
          </h2>
          <form onSubmit={handleForm} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="bookName"
                id="bookName"
                placeholder=" "
                required
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
              />
              <label
                htmlFor="bookName"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Book Name
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="author"
                id="author"
                placeholder=" "
                required
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
              />
              <label
                htmlFor="author"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
              >
                Author Name
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors text-lg font-semibold shadow-md"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
