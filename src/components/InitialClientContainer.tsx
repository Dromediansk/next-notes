"use client";

import { DefaultUser } from "next-auth";
import StickyNotesList from "./stickyNoteList/StickyNotesList";
import { Category } from "@prisma/client";
import { NoteWithCategory } from "@/utils/types/prisma";
import { FC, useEffect } from "react";
import NewNoteButton from "./newNote/NewNoteButton";
import { setIsLoadingNotes, setNotes } from "@/stores/notes";
import { setCategories } from "@/stores/categories";
import { setUser } from "@/stores/user";

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
  useEffect(() => {
    setNotes(fetchedNotes);
    setCategories(fetchedCategories);
    setUser(fetchedUser);

    setIsLoadingNotes(false);
  }, [fetchedNotes, fetchedCategories, fetchedUser]);

  return (
    <div>
      <NewNoteButton />
      <StickyNotesList />
    </div>
  );
};

export default InitialClientContainer;
