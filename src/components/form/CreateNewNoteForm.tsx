"use client";
import { createNoteInDb } from "@/services/notes";
import { RouteParams } from "@/utils/types/common";
import { DefaultUser } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import { FC, SyntheticEvent, useState } from "react";

type CreateNoteFormProps = {
  user: DefaultUser;
};

const CreateNoteForm: FC<CreateNoteFormProps> = ({ user }) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const params = useParams<RouteParams>();

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      await createNoteInDb(inputValue, user.id, params.date, 1);
      setInputValue("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="inline-flex justify-center items-center border-2 border-gray-200 shadow-sm w-full sm:w-96"
      onSubmit={handleAddNote}
    >
      <input
        className="w-full sm:w-96 h-10 text-gray-900 text-sm rounded p-4 resize"
        placeholder="What did you learn?"
        name="body"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        required
        autoFocus
      />
    </form>
  );
};

export default CreateNoteForm;
