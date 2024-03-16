import { NoteWithCategory } from "@/utils/types/prisma";
import { create } from "zustand";

type NoteStore = {
  notes: NoteWithCategory[]
  isLoading: boolean
}

const useNotesStore = create<NoteStore>(() => ({
  notes: [],
  isLoading: true,
}))

export const setNotes = (notes: NoteWithCategory[]) => useNotesStore.setState({ notes })

export const addNote = (note: NoteWithCategory) => useNotesStore.setState((state) => ({ notes: [note, ...state.notes] }))

export const getNotes = () => useNotesStore.getState().notes

export const useNotes = () => useNotesStore()

export const setIsLoadingNotes = (isLoading: boolean) => useNotesStore.setState({ isLoading })

