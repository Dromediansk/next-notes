import { Note, Prisma } from "@prisma/client";

export type NoteWithCategory = Note & { isTemporary?: boolean } & Prisma.NoteGetPayload<{
  include: { category: true }
}>