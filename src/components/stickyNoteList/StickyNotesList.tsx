"use client";

import StickyNote from "../stickyNote/StickyNote";
import {
  getNotes,
  setIsLoadingNotes,
  setNotes,
  useNotes,
} from "@/stores/notes";
import ProgressBar from "@/lib/ProgressBar";
import NoStickyNotes from "./NoStickyNotes";
import { Fragment, useState } from "react";
import StickyNoteDialog from "../stickyNote/StickyNoteDialog";
import { getUser } from "@/stores/user";
import { redirect, useSearchParams } from "next/navigation";
import { LOGIN_ROUTE } from "@/utils/constants";
import { deleteNoteInDb, refetchNotes } from "@/services/notes";

const StickyNotesList = () => {
  const { notes, isLoading } = useNotes();
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const handleDeleteNote = async (noteId: string) => {
    try {
      setIsLoadingNotes(true);

      const user = getUser();
      if (!user) {
        return redirect(LOGIN_ROUTE);
      }

      const notes = getNotes();
      const noteToDelete = notes.find(
        (noteToDelete) => noteToDelete.id === noteId
      );

      if (noteToDelete) {
        const newNotes = notes.filter((note) => note.id !== noteToDelete.id);
        setNotes(newNotes);

        await deleteNoteInDb(noteId);
        await refetchNotes({ date });
      }
    } catch (error) {
      console.log("Error deleting note ", error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  return (
    <div className="bg-white min-h-[89vh] rounded shadow-md">
      <div className="h-1.5">{isLoading && <ProgressBar />}</div>
      {notes.length === 0 ? (
        <NoStickyNotes />
      ) : (
        <div className="p-4 pt-2 flex flex-wrap gap-4">
          {notes.map((note) => {
            const isDialogOpen = openDialogId === note.id;

            return (
              <Fragment key={note.id}>
                <StickyNote
                  note={note}
                  setDialogOpenId={setOpenDialogId}
                  onDelete={() => handleDeleteNote(note.id)}
                />
                {isDialogOpen && (
                  <StickyNoteDialog
                    note={note}
                    onDialogClose={() => setOpenDialogId(null)}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StickyNotesList;
