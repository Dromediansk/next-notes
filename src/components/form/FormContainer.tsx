import CreateNoteForm from "./CreateNewNoteForm";
import { FC } from "react";
import { Session } from "next-auth";
import { Category } from "@prisma/client";

type FormContainerProps = {
  session: Session;
  categories: Category[];
};

const FormContainer: FC<FormContainerProps> = ({ session, categories }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center my-4 sm:my-10">
      {session.user && (
        <CreateNoteForm user={session.user} categories={categories} />
      )}
    </div>
  );
};

export default FormContainer;
