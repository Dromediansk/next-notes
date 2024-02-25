"use client";

import { createNoteInDb } from "@/services/notes";
import { NoteFormState, RouteParams } from "@/utils/types/common";
import { DefaultUser } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import CategorySelect from "./CategorySelect";
import { Category } from "@prisma/client";

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

  const router = useRouter();
  const params = useParams<RouteParams>();

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      await createNoteInDb(formState, user.id, params.date, 1);
      setFormState(defaultFormState);
      router.refresh();
    } catch (error) {
      console.log(error);
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
        className="max-w-96 w-full h-16 text-gray-900 bg-gray-200 text-sm rounded p-4 resize"
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
