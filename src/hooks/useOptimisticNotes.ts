import { getNotes } from "@/stores/notes";
import { NoteWithCategory } from "@/utils/types/prisma";
import { useOptimistic } from "react";

export enum NoteAction {
  CREATE = "create",
  DELETE = "delete",
}
type OptimisticNotePayload = NoteWithCategory | string;

const deleteNote = (state: NoteWithCategory[], noteId: string) => state.filter(({ id }) => id !== noteId);

const createNote = (state: NoteWithCategory[], note: NoteWithCategory) => [{ ...note, isTemporary: true }, ...state];

export const useOptimisticNotes = () => {
  const [optimisticNotes, setOptimisticNotes] = useOptimistic(
    getNotes(),
    (state, { action, payload }: { action: NoteAction; payload: OptimisticNotePayload }) => {
      switch (action) {
        case NoteAction.DELETE:
          return deleteNote(state, payload as string)
        case NoteAction.CREATE:
          return createNote(state, payload as NoteWithCategory)
        default:
          return state
      }
    },
  );

  return {
    optimisticNotes,
    setOptimisticNotes,
  };
}