"use server";

import { prisma } from "@/prisma/db";
import { CreateNoteBody, NoteFormState } from "@/utils/types/common";
import { NoteWithCategory } from "@/utils/types/prisma";
import { DefaultUser } from "next-auth";

export const getNotesByDate = async (
  userId: string,
  date: string
): Promise<NoteWithCategory[]> => {
  try {
    const notes: NoteWithCategory[] = await prisma.note.findMany({
      include: {
        category: true
      },
      where: {
        authorId: userId,
        createdAt: { lte: new Date(date), gte: new Date(date) },
      },
      orderBy: { updatedAt: "desc" },
    });
    return notes;
  } catch (error) {
    throw new Error(`Error fetching notes: ${error}`);
  }
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

export const updateNoteInDb = async (noteId: string, formState: NoteFormState) => {
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
