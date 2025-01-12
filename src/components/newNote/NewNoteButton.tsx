import { FC, ReactNode, useState } from "react";
import NewNoteDialog from "./NewNoteDialog";
import PlusIcon from "@/lib/icons/PlusIcon";

type ButtonProps = {
  children?: ReactNode;
  onClick: () => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`fixed bottom-10 right-10 p-3 rounded-md shadow-sm text-white bg-main-dark hover:bg-main ${className}`}
      onClick={onClick}
    >
      <PlusIcon />
      {children}
    </button>
  );
};

const NewNoteButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => setIsOpened(true);

  return (
    <>
      {/* DESKTOP SIZE */}
      <Button
        onClick={handleOpen}
        className="hidden md:flex md:items-center md:gap-2"
      >
        Add new
      </Button>

      {/* MOBILE SIZE */}
      <Button onClick={handleOpen} className="md:hidden" />

      {isOpened && <NewNoteDialog onClose={() => setIsOpened(false)} />}
    </>
  );
};

export default NewNoteButton;
