"use client";

import { DefaultUser } from "next-auth";
import StickyNotesList from "./stickyNote/StickyNotesList";
import { Category } from "@prisma/client";
import { NoteWithCategory } from "@/utils/types/prisma";
import { FC, useEffect } from "react";
import { setIsLoadingNotes, setNotes } from "@/stores/notes";
import { setUser } from "@/stores/user";
import CreateNoteForm from "./form/CreateNewNoteForm";

type InitialClientContainerProps = {
  user: DefaultUser;
  categories: Category[];
  fetchedNotes: NoteWithCategory[];
};

const InitialClientContainer: FC<InitialClientContainerProps> = ({
  user,
  categories,
  fetchedNotes,
}) => {
  useEffect(() => {
    setNotes(fetchedNotes);
    setIsLoadingNotes(false);
  }, [fetchedNotes]);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div>
      <CreateNoteForm categories={categories} />
      <StickyNotesList categories={categories} />
    </div>
  );
};

export default InitialClientContainer;
