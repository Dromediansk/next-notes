import FormContainer from "@/components/form/FormContainer";
import { FC, ReactNode } from "react";

type NotesByDateLayoutProps = {
  children: ReactNode;
};

const NotesByDateLayout: FC<NotesByDateLayoutProps> = ({ children }) => {
  return (
    <>
      <FormContainer />
      {children}
    </>
  );
};

export default NotesByDateLayout;
