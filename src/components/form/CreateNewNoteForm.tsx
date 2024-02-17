"use client";
import { createNoteInDb } from "@/services/notes";
import { BASE_BACKGROUND_COLORS, TEXT_COLORS } from "@/utils/colors";
import { CreateNoteFormState, RouteParams } from "@/utils/types/common";
import { DefaultUser } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import ColorCirclePicker from "../ColorCirclePicker";

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

  const handleChangeColor = (color: string) => {
    setFormState((prevState) => ({
      ...prevState,
      color,
    }));
  };

  console.log("formState", formState);

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
      <div className="flex gap-2 p-2 rounded border-none">
        {Array.from(Object.values(BASE_BACKGROUND_COLORS)).map(
          (backgroundColor) => (
            <ColorCirclePicker
              key={backgroundColor}
              color={TEXT_COLORS.dark}
              backgroundColor={backgroundColor}
              onClick={handleChangeColor}
              isSelected={backgroundColor === formState.color}
            />
          )
        )}
      </div>
    </form>
  );
};

export default CreateNoteForm;
