import { Note, Prisma } from "@prisma/client";

export type NoteWithCategory = Note & Prisma.NoteGetPayload<{
  include: { category: true }
}>