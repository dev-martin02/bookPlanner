import { FormEvent } from "react";
import { Note } from "../../interface";
import { bookStore } from "../../store/book.store";
import { PlusCircle } from "lucide-react";

interface AddChapterFormProps {
  book: string;
}

export const AddNoteForm = ({ book }: AddChapterFormProps) => {
  const { addGeneralNote } = bookStore();
  function handleNoteForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const note: Note = {
      note: "",
      id: "",
      bookId: book,
    };

    for (const value of formData.entries()) {
      //@ts-ignore
      note[value[0]] = value[1];
    }
    note["id"] = crypto.randomUUID();

    addGeneralNote(note);
  }
  return (
    <form onSubmit={handleNoteForm} className="mt-8 space-y-2">
      <div className="relative">
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
