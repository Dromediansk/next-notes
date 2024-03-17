"use client";

import { createNoteInDb, refetchNotesByDate } from "@/services/notes";
import { NoteFormState, RouteParams } from "@/utils/types/common";
import { redirect, useParams } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import CategorySelect from "./CategorySelect";
import { addNote, setIsLoadingNotes, setNotes } from "@/stores/notes";
import { getUser } from "@/stores/user";
import { LOGIN_ROUTE } from "@/utils/constants";
import { useCategories } from "@/stores/categories";
import { v4 as uuidv4 } from "uuid";
import { NoteWithCategory } from "@/utils/types/prisma";

const defaultFormState: NoteFormState = {
  text: "",
  categoryId: 1, // PERSONAL
};

const NewNoteForm = () => {
  const [formState, setFormState] = useState<NoteFormState>(defaultFormState);
  const { categories } = useCategories();

  const params = useParams<RouteParams>();

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoadingNotes(true);

      const category = categories.find((c) => c.id === formState.categoryId);

      if (!category) {
        throw new Error("Category not found!");
      }
      const user = getUser();
      if (!user) {
        redirect(LOGIN_ROUTE);
      }

      const newNote: NoteWithCategory = {
        ...formState,
        id: uuidv4(),
        category,
        authorId: user.id,
        createdAt: new Date(params.date),
        updatedAt: new Date(params.date),
        orderNumber: 1,
        isTemporary: true,
      };
      addNote(newNote);

      setFormState((prevState) => ({
        ...defaultFormState,
        categoryId: prevState.categoryId,
      }));
      await createNoteInDb(formState, user.id, params.date, 1);
      await refetchNotesByDate(user.id, params.date);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleChangeFormState = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCategory = (categoryId: number) => {
    setFormState((prevState) => ({
      ...prevState,
      categoryId,
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-2">
      <form
        className="flex flex-wrap justify-center gap-2 w-full bg-gray-100 rounded p-2"
        onSubmit={handleAddNote}
      >
        <CategorySelect
          selectedCategoryId={formState.categoryId}
          onChange={handleChangeCategory}
        />
        <input
          className="max-w-96 w-full h-12 text-gray-900 bg-gray-200 text-sm rounded p-4 resize"
          placeholder="What did you learn?"
          name="text"
          value={formState.text}
          onChange={handleChangeFormState}
          required
          autoFocus
        />
      </form>
    </div>
  );
};

export default NewNoteForm;