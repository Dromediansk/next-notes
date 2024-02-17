"use client";
import { createNoteInDb } from "@/services/notes";
import { CreateNoteFormState, RouteParams } from "@/utils/types/common";
import { DefaultUser } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";

type CreateNoteFormProps = {
  user: DefaultUser;
};

const defaultFormState: CreateNoteFormState = {
  text: "",
  color: "#f1f5f9", // slate 100
};

const CreateNoteForm: FC<CreateNoteFormProps> = ({ user }) => {
  const [formState, setFormState] =
    useState<CreateNoteFormState>(defaultFormState);

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

  return (
    <form
      className="flex justify-center items-center border-2 border-gray-200 shadow-sm w-full sm:w-96 bg-gray-50"
      onSubmit={handleAddNote}
    >
      <input
        className="w-full sm:w-96 h-10 text-gray-900 text-sm rounded p-4 resize"
        placeholder="What did you learn?"
        name="text"
        value={formState.text}
        onChange={handleChangeFormState}
        required
        autoFocus
      />
      <div className="w-10 h-full" />
      <input
        type="color"
        name="color"
        value={formState.color}
        onChange={handleChangeFormState}
        className="rounded px-2"
      />
    </form>
  );
};

export default CreateNoteForm;
