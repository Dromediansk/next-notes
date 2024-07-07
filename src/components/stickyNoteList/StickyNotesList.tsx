"use client";

import StickyNote from "../stickyNote/StickyNote";
import ProgressBar from "@/lib/ProgressBar";
import NoStickyNotes from "./NoStickyNotes";
import { Fragment, Suspense, useState } from "react";
import StickyNoteDialog from "../stickyNote/StickyNoteDialog";
import { getUser } from "@/stores/user";
import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/utils/constants";
import { deleteNoteInDb } from "@/services/notes";
import { useNoteStore } from "@/providers/notes.provider";

const StickyNotesList = () => {
  const { notes, isLoading, setNotes, setIsLoadingNotes } = useNoteStore(
    (state) => state
  );

  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const handleDeleteNote = async (noteId: string) => {
    try {
      setIsLoadingNotes(true);

      const user = getUser();
      if (!user) {
        return redirect(LOGIN_ROUTE);
      }

      const noteToDelete = notes.find(
        (noteToDelete) => noteToDelete.id === noteId
      );

      if (noteToDelete) {
        const newNotes = notes.filter((note) => note.id !== noteToDelete.id);
        setNotes(newNotes);

        await deleteNoteInDb(noteId);
      }
    } catch (error) {
      console.log("Error deleting note ", error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
};

export default StickyNotesList;
