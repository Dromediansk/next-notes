"use server";

import { prisma } from "@/prisma/db";
import { setNotes } from "@/stores/notes";
import { CreateNoteBody, NoteFormState } from "@/utils/types/common";
import { NoteWithCategory, NotesQuery } from "@/utils/types/prisma";
import { DefaultUser, getServerSession } from "next-auth";

export const getNotes = async (query: NotesQuery) => {
  try {
    const session = await getServerSession();
    const { date, categoryId } = query;

    const whereClause = {
      authorId: session?.user?.id,
      ...(date && { createdAt: { lte: new Date(date), gte: new Date(date) } }),
      ...(categoryId && { categoryId }),
    };

    const notes: NoteWithCategory[] = await prisma.note.findMany({
      include: {
        category: true,
      },
      where: whereClause,
      orderBy: { updatedAt: "desc" },
    });
    return notes;
  } catch (error) {
    throw new Error(`Error fetching notes: ${error}`);
  }
};

export const refetchNotes = async (query: NotesQuery) => {
  const data = await getNotes(query);
  setNotes(data);
};

export const createNoteInDb = async (
  formState: NoteFormState,
  userId: DefaultUser["id"],
  createdAt: string,
  orderNumber: number
) => {
  try {
    const newNote: CreateNoteBody = {
      ...formState,
      authorId: userId,
      createdAt: new Date(createdAt),
      orderNumber,
    };

    await prisma.note.create({
      data: newNote,
    });
  } catch (error) {
    throw new Error(`Error creating note in db! ${error}`);
  }
};

export const updateNoteInDb = async (
  noteId: string,
  formState: NoteFormState
) => {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: {
        ...formState,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    throw new Error(`Error updating note in db! ${error}`);
  }
};

export const deleteNoteInDb = async (noteId: string) => {
  try {
    await prisma.note.delete({ where: { id: noteId } });
  } catch (error) {
    throw new Error(`Error deleting note in db! ${error}`);
  }
};
