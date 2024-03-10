"use client";

import { FC } from "react";
import StickyNote from "./StickyNote";
import { Category } from "@prisma/client";
import { useNotes } from "@/stores/notes";
import ProgressBar from "@/lib/ProgressBar";

type StickyNotesListProps = {
  categories: Category[];
};

const StickyNotesList: FC<StickyNotesListProps> = ({ categories }) => {
  const { notes, isLoading } = useNotes();

  return (
    <>
      <div className="bg-white min-h-[74vh] sm:min-h-[80vh] rounded shadow-md">
        <div className="h-1.5">{isLoading && <ProgressBar />}</div>
        {!isLoading && notes.length === 0 ? (
          <p className="text-center text-gray-500 pt-10">
            Your notes seem to be on vacation. <br /> Time to break the silence
            with a new note!
          </p>
        ) : (
          <div className="p-4 pt-2 flex flex-wrap gap-4">
            {notes.map((note) => (
              <StickyNote key={note.id} note={note} categories={categories} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StickyNotesList;
