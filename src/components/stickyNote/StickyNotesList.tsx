"use client";

import { Note } from "@prisma/client";
import { FC } from "react";
import StickyNote from ".";

type StickyNotesListProps = {
  notes: Note[];
};

const StickyNotesList: FC<StickyNotesListProps> = ({ notes }) => {
  return (
    <div className="bg-white min-h-[70vh] rounded shadow-md">
      {notes.length === 0 ? (
        <p className="text-center text-gray-500 pt-10">
          Oops! Your notes seem to be on vacation. <br /> Time to break the
          silence with a new note!
        </p>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-6 my-4">
          {notes.map((note) => (
            <StickyNote key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StickyNotesList;
