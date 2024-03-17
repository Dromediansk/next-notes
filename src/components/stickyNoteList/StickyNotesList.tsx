"use client";

import StickyNote from "../stickyNote/StickyNote";
import { useNotes } from "@/stores/notes";
import ProgressBar from "@/lib/ProgressBar";
import NoStickyNotes from "./NoStickyNotes";

const StickyNotesList = () => {
  const { notes, isLoading } = useNotes();

  return (
    <>
      <div className="bg-white min-h-[85vh] rounded shadow-md">
        <div className="h-1.5">{isLoading && <ProgressBar />}</div>
        {!isLoading && notes.length === 0 ? (
          <NoStickyNotes />
        ) : (
          <div className="p-4 pt-2 flex flex-wrap gap-4">
            {notes.map((note) => (
              <StickyNote key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StickyNotesList;
