import { Note } from "@prisma/client";
import { Profile } from "next-auth";

export type CreateNoteBody = Omit<Note, "id" | "updatedAt">;

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

export type NoteByDate = { [key: string]: Note[] };

export type AuthProfile = Profile & {
  given_name: string;
  last_name: string;
};

export type NoteFormState = {
  text: string;
  categoryId: number;
};

export type Filter = {
  date?: string | null;
  categoryId?: string | null;
};
