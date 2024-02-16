import { Profile } from "next-auth";

export type Note = {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
  orderNumber: number;
};

export type CreateNoteBody = Pick<
  Note,
  "authorId" | "text" | "createdAt" | "orderNumber"
>;

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