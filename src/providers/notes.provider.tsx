"use client";

import { createNotesStore, NoteStore } from "@/stores/notes.store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type NoteStoreApi = ReturnType<typeof createNotesStore>;

export const NoteStoreContext = createContext<NoteStoreApi | undefined>(
  undefined
);

export type NoteStoreProviderProps = {
  children: ReactNode;
};

export const NoteStoreProvider = ({ children }: NoteStoreProviderProps) => {
  const storeRef = useRef<NoteStoreApi | undefined>(undefined);
  if (!storeRef.current) {
    storeRef.current = createNotesStore();
  }

  return (
    <NoteStoreContext.Provider value={storeRef.current}>
      {children}
    </NoteStoreContext.Provider>
  );
};

export const useNoteStore = <T,>(selector: (store: NoteStore) => T): T => {
  const noteStoreContext = useContext(NoteStoreContext);

  if (!noteStoreContext) {
    throw new Error(`useNoteStore must be used within NoteStoreProvider`);
  }

  return useStore(noteStoreContext, selector);
};
