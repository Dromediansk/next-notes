"use client";

import { createNoteInDb, refetchNotes } from "@/services/notes";
import { NoteFormState } from "@/utils/types/common";
import { redirect, useSearchParams } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import CategorySelect from "./CategorySelect";
import { addNote, setIsLoadingNotes } from "@/stores/notes";
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

  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoadingNotes(true);

      const category = categories.find((c) => c.id === formState.categoryId);

      if (!category) {
        throw new Error("Category not found!");
      }
      if (!date) {
        throw new Error("Date not found!");
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
        createdAt: new Date(date),
        updatedAt: new Date(date),
        orderNumber: 1,
        isTemporary: true,
      };
      addNote(newNote);

      setFormState((prevState) => ({
        ...defaultFormState,
        categoryId: prevState.categoryId,
      }));
      await createNoteInDb(formState, user.id, date, 1);
      await refetchNotes({ date });
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

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-2">
      <form
        className="flex flex-wrap justify-center gap-2 w-full bg-gray-100 rounded p-2"
        onSubmit={handleAddNote}
      >
        <CategorySelect
          selectedCategoryId={formState.categoryId}
          setFormState={setFormState}
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
