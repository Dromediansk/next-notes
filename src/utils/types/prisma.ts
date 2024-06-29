import { Note, Prisma } from "@prisma/client";

export type NotesQuery = {
  date?: string | null;
  categoryId?: number;
};

export type NoteWithCategory = Note & {
  isTemporary?: boolean;
} & Prisma.NoteGetPayload<{
    include: { category: true };
  }>;
