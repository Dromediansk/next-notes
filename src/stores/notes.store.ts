import { NoteWithCategory } from "@/utils/types/prisma";
import { createStore } from "zustand/vanilla";

type NoteState = {
  notes: NoteWithCategory[];
  isLoading: boolean;
};

type NoteActions = {
  setNotes: (notes: NoteWithCategory[]) => void;
  addNote: (note: NoteWithCategory) => void;
  setIsLoadingNotes: (isLoading: boolean) => void;
};

export type NoteStore = NoteState & NoteActions;

const defaultInitState: NoteState = {
  notes: [],
  isLoading: true,
};

export const createNotesStore = (initState: NoteState = defaultInitState) => {
  return createStore<NoteStore>()((set) => ({
    ...initState,
    setNotes: (notes) => set({ notes }),
    addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
    setIsLoadingNotes: (isLoading) => set({ isLoading }),
  }));
};
