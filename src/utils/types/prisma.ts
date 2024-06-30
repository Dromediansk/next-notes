import { Note, Prisma } from "@prisma/client";
import { Filter } from "./common";

export type NotesQuery = Filter;

export type NoteWithCategory = Note & {
  isTemporary?: boolean;
} & Prisma.NoteGetPayload<{
    include: { category: true };
  }>;
