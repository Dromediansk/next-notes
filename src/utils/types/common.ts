import { Profile } from "next-auth";

export type Note = {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
  orderNumber: number;
  color: string;
};

export type CreateNoteBody = Omit<Note, 'id'>;

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

export type RouteParams = {
  date: string;
};

export type NoteFormState = {
  text: string;
  color: string
}