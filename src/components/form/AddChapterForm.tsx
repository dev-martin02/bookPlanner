import { PlusCircle } from "lucide-react";
import { FormEvent } from "react";
import { Chapter } from "../../interface";
import { bookStore } from "../../store/book.store";

interface AddChapterFormProps {
  book: string;
}
export const AddChapterForm = ({ book }: AddChapterFormProps) => {
  const { addChapter } = bookStore();

  function handleChapterForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const chapter: Chapter = {
      chapterNum: "",
      chapterName: "",
      id: "",
      bookId: book,
    };

    for (const value of formData.entries()) {
      //@ts-ignore
      chapter[value[0]] = value[1];
    }
    chapter["id"] = chapter["chapterNum"];

    addChapter(chapter);
  }

  return (
    <form
      onSubmit={handleChapterForm}
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
