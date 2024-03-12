"use client";

import { DefaultUser } from "next-auth";
import StickyNotesList from "./stickyNoteList/StickyNotesList";
import { Category } from "@prisma/client";
import { NoteWithCategory } from "@/utils/types/prisma";
import { FC } from "react";
import CreateNoteForm from "./form/CreateNewNoteForm";
import { useInitializeFetchedData } from "@/hooks/useInitializeFetchedData";

type InitialClientContainerProps = {
  fetchedUser: DefaultUser;
  fetchedCategories: Category[];
  fetchedNotes: NoteWithCategory[];
};

const InitialClientContainer: FC<InitialClientContainerProps> = (props) => {
  useInitializeFetchedData(props);

  return (
    <div>
      <CreateNoteForm />
      <StickyNotesList />
    </div>
  );
};

export default InitialClientContainer;
