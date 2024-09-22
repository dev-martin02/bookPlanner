import { useParams } from "react-router-dom";
import { useBookStore } from "../../store/book.store";
import { FormEvent, useState } from "react";
import { PlusCircle, Trash2, X } from "lucide-react";
import { ChapterNote } from "../../interface";

export const Chapter = () => {
  const urlChapterId = useParams<{ chapterId: string }>();
  const {
    bookChapters: bookChapter,
    addChapterNote,
    chapterNoteArr,
    deleteChapterNote,
  } = useBookStore();
  const [showNoteForm, setShowNoteForm] = useState(false);

  const [showQuestions, setShowQuestion] = useState(false);

  // Questions
  const deepUnderstandingQuestions = [
    "What is the main idea or argument presented in this chapter?",
    "How does this chapter fit into the overall structure or theme of the book?",
    "What evidence or examples does the author use to support their points?",
    "What assumptions does the author make in this chapter?",
    "What are your own thoughts or reactions to the ideas presented? Do you agree or disagree?",
    "How can the insights from this chapter be applied to real-world situations or your own life?",
  ];

  const question = deepUnderstandingQuestions.map((content, index) => (
    <li key={index} className="text-lg font-medium">
      {content}
    </li>
  ));
  // Get the chapter
  const currentChapter = bookChapter.filter(
    (chapter) => chapter.chapterNum === urlChapterId.chapterId
  );

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {currentChapter.length === 0 ? (
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
          This book doesn't have this chapter
        </h2>
      ) : (
        currentChapter.map(({ chapterName }) => (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
              {chapterName}
            </h2>
            <button
              onClick={() => setShowNoteForm(!showNoteForm)}
              className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Note
            </button>
            <button
              className="px-4 py-2 bg-green-400 border-green-400 rounded hover:bg-green-500"
              onClick={() => setShowQuestion(!showQuestions)}
            >
              Deep your understanding
            </button>
            {showQuestions && (
              <div className="absolute flex items-center inset-0 justify-center backdrop-blur-md">
                <button onClick={() => setShowQuestion(!showQuestions)}>
                  <X className=" text-blue-500 absolute top-5 left-5" />
                </button>
                <div className="ring-2 ring-blue-500 bg-blue-500/90 p-5 rounded-lg shadow-lg max-w-md">
                  <ul className="list-disc list-inside text-white space-y-2">
                    {question}
                  </ul>
                </div>
              </div>
            )}
            {showNoteForm && formElement}
            <ul className="space-y-2">
              {chapterNoteArr.map(({ note, id, chapterId }) => {
                if (chapterId === urlChapterId.chapterId) {
                  return (
                    <li
                      key={id}
                      className="flex justify-between items-center p-2 bg-gray-100 rounded"
                    >
                      <p>{note}</p>
                      <button
                        onClick={() => deleteChapterNote(id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>{" "}
                    </li>
                  );
                }
              })}
            </ul>
          </>
        ))
      )}
    </div>
  );
};
