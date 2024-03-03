"use client";

import { createNoteInDb, getNotesByDate } from "@/services/notes";
import { NoteFormState, RouteParams } from "@/utils/types/common";
import { DefaultUser } from "next-auth";
import { useParams } from "next/navigation";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import CategorySelect from "./CategorySelect";
import { Category } from "@prisma/client";
import { setIsLoadingNotes, setNotes } from "@/stores/notes";

type CreateNoteFormProps = {
  user: DefaultUser;
  categories: Category[];
};

const defaultFormState: NoteFormState = {
  text: "",
  categoryId: 1, // PERSONAL
};

const CreateNoteForm: FC<CreateNoteFormProps> = ({ user, categories }) => {
  const [formState, setFormState] = useState<NoteFormState>(defaultFormState);

  const params = useParams<RouteParams>();

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      setIsLoadingNotes(true);

      setFormState((prevState) => ({
        ...defaultFormState,
        categoryId: prevState.categoryId,
      }));
      await createNoteInDb(formState, user.id, params.date, 1);
      const notes = await getNotesByDate(user.id, params.date);

      setNotes(notes);
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
    <form
      className="flex flex-wrap justify-center gap-4 w-full bg-white rounded shadow-sm p-4"
      onSubmit={handleAddNote}
    >
      <CategorySelect
        categories={categories}
        selectedCategoryId={formState.categoryId}
        onChange={handleChangeCategory}
      />
      <input
        className="max-w-96 w-full h-10 text-gray-900 bg-gray-200 text-sm rounded p-4 resize"
        placeholder="What did you learn?"
        name="text"
        value={formState.text}
        onChange={handleChangeFormState}
        required
        autoFocus
      />
    </form>
  );
};

export default CreateNoteForm;
