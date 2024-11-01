import { FormEvent } from "react";
import { Note } from "../../interface";
import { useBookStore } from "../../store/book.store";
import { EyeOff, PlusCircle } from "lucide-react";

interface AddChapterFormProps {
  book: string;
  showNoteForm: boolean;
  setShowNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNoteForm = ({
  book,
  showNoteForm,
  setShowNoteForm,
}: AddChapterFormProps) => {
  const { addGeneralNote } = useBookStore();
  function handleNoteForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const note: Note = {
      note: "",
      id: "",
      bookId: book,
    };

    for (const [key, value] of formData.entries()) {
      note[key as keyof Note] = value as string;
    }
    note["id"] = crypto.randomUUID();

    addGeneralNote(note);
  }
  return (
    <form onSubmit={handleNoteForm} className="mt-8 space-y-2 flex flex-col ">
      <div className="relative w-full">
        <input
          type="text"
          name="note"
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
      <div className="flex w-44 justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center w-20 items-center p-2"
        >
          <PlusCircle className="w-5 h-5 " />
        </button>
        <button
          onClick={() => setShowNoteForm(!showNoteForm)}
          className="bg-gray-500 w-20  text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex justify-center items-center p-2"
        >
          <EyeOff className="w-5 h-5 " />
        </button>
      </div>
    </form>
  );
};
