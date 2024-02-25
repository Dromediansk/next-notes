"use client";

import { FC } from "react";
import StickyNote from "./StickyNote";
import { NoteWithCategory } from "@/utils/types/prisma";
import { Category } from "@prisma/client";

type StickyNotesListProps = {
  notes: NoteWithCategory[];
  categories: Category[];
};

const StickyNotesList: FC<StickyNotesListProps> = ({ notes, categories }) => {
  return (
    <div className="bg-white min-h-[75vh] rounded shadow-md">
      {notes.length === 0 ? (
        <p className="text-center text-gray-500 pt-10">
          Your notes seem to be on vacation. <br /> Time to break the silence
          with a new note!
        </p>
      ) : (
        <div className="p-4 text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <StickyNote key={note.id} note={note} categories={categories} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StickyNotesList;
