import { useParams } from "react-router-dom";
import { bookStore } from "../../store/book.store";
import { FormEvent, useState } from "react";
import { PlusCircle } from "lucide-react";
import { ChapterNote } from "../../interface";

export const Chapter = () => {
  const urlChapterId = useParams<{ chapterId: string }>();
  const { bookChapter, addChapterNote, chapterNoteArr } = bookStore();
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Get the chapter
  const currentChapter = bookChapter.filter(
    (chapter) => chapter.chapterNum === urlChapterId.chapterId
  );

  console.log(urlChapterId);
  function handleNoteForm(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const note: ChapterNote = {
      note: "",
      id: "",
      //@ts-ignore
      chapterId: urlChapterId.chapterId,
    };

    for (const [key, value] of formData.entries()) {
      note[key as keyof ChapterNote] = value as string;
    }
    note["id"] = crypto.randomUUID();

    addChapterNote(note);
  }

  const formElement = (
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

  return currentChapter.length === 0 ? (
    <h2>This book doesn't have this chapter</h2>
  ) : (
    currentChapter.map(({ chapterName }) => (
      <>
        <h2>{chapterName}</h2>
        <button
          onClick={() => setShowNoteForm(!showNoteForm)}
          className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Note
        </button>
        {showNoteForm && formElement}
        <ul>
          {chapterNoteArr.map(({ note, id }) => (
            <li key={id}>{note}</li>
          ))}
        </ul>
      </>
    ))
  );
};
