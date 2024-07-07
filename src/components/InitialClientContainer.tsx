"use client";

import { DefaultUser } from "next-auth";
import StickyNotesList from "./stickyNoteList/StickyNotesList";
import { Category } from "@prisma/client";
import { NoteWithCategory } from "@/utils/types/prisma";
import { FC, useEffect } from "react";
import NewNoteButton from "./newNote/NewNoteButton";
import { setCategories } from "@/stores/categories";
import { setUser } from "@/stores/user";
import { useNoteStore } from "@/providers/notes.provider";

type InitialClientContainerProps = {
  fetchedUser: DefaultUser;
  fetchedCategories: Category[];
  fetchedNotes: NoteWithCategory[];
};

const InitialClientContainer: FC<InitialClientContainerProps> = ({
  fetchedUser,
  fetchedCategories,
  fetchedNotes,
}) => {
  const { setNotes, setIsLoadingNotes } = useNoteStore((state) => state);

  useEffect(() => {
    setNotes(fetchedNotes);
    setCategories(fetchedCategories);
    setUser(fetchedUser);

    setIsLoadingNotes(false);
  }, [
    fetchedNotes,
    fetchedCategories,
    fetchedUser,
    setNotes,
    setIsLoadingNotes,
  ]);

  return (
    <div>
      <NewNoteButton />
      <StickyNotesList />
    </div>
  );
};

export default InitialClientContainer;
