"use client";
import { createNoteInDb } from "@/services/notes";
import { BACKGROUND_COLORS, BASE_BACKGROUND_COLORS } from "@/utils/colors";
import { CreateNoteFormState, RouteParams } from "@/utils/types/common";
import { DefaultUser } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import ColorCirclePicker from "../colors/ColorCirclePicker";
import ColorCircleList from "../colors/ColorCircleList";

type CreateNoteFormProps = {
  user: DefaultUser;
};

const defaultFormState: CreateNoteFormState = {
  text: "",
  color: BASE_BACKGROUND_COLORS.white, // slate 100
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

  const handleChangeColor = (color: string) => {
    setFormState((prevState) => ({
      ...prevState,
      color,
    }));
  };

  return (
    <form
      className="border-2 border-gray-200 w-full sm:w-96 bg-gray-50"
      onSubmit={handleAddNote}
    >
      <input
        className="w-full h-16 text-gray-900 text-sm rounded p-4 resize"
        placeholder="What did you learn?"
        name="text"
        value={formState.text}
        onChange={handleChangeFormState}
        required
        autoFocus
      />
      <ColorCircleList
        selectedColor={formState.color}
        onClick={handleChangeColor}
      />
    </form>
  );
};

export default CreateNoteForm;
