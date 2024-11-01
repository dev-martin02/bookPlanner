import { EyeOff, PlusCircle } from "lucide-react";
import { FormEvent } from "react";
import { Chapter } from "../../interface";
import { useBookStore } from "../../store/book.store";
import { addChapterToDB } from "../../api/SupaApi";
import { generateUniqueID } from "../../util/util";

interface AddChapterFormProps {
  book: string;
  showChapterForm: boolean;
  setShowChapterForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddChapterForm = ({
  book,
  showChapterForm,
  setShowChapterForm,
}: AddChapterFormProps) => {
  const { addChapter } = useBookStore();

  function handleChapterForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const chapter: Chapter = {
      chapterNum: "",
      chapterName: "",
      id: 0,
      bookId: book,
    };

    for (const [key, value] of formData.entries()) {
      if (key in chapter) {
        const typedKey = key as keyof Chapter;
        if (typedKey !== "id") {
          chapter[typedKey] = value as string;
        }
      }
    }
    chapter["id"] = generateUniqueID();

    addChapterToDB(chapter)
      .then(() => addChapter(chapter))
      .catch((e) => console.log(e));
  }

  return (
    <form
      onSubmit={handleChapterForm}
      className="space-y-4 bg-white p-6 rounded-lg mb-4 shadow-md"
    >
      <div className="space-y-9">
        <div className="relative">
          <input
            type="number"
            name="chapterNum"
            id="chapterNum"
            placeholder=" "
            className="peer mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-transparent p-1 "
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
            className="peer p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-transparent"
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

      <div className="flex w-44 justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center w-20 items-center p-2"
        >
          <PlusCircle className="w-5 h-5 " />
        </button>
        <button
          onClick={() => setShowChapterForm(!showChapterForm)}
          className="bg-gray-500 w-20  text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex justify-center items-center p-2"
        >
          <EyeOff className="w-5 h-5 " />
        </button>
      </div>
    </form>
  );
};
