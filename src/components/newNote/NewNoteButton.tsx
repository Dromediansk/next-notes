import { useState } from "react";
import NewNoteDialog from "./NewNoteDialog";
import PlusIcon from "@/lib/icons/PlusIcon";

const NewNoteButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => setIsOpened(true);

  return (
    <>
      <button
        className="fixed bottom-10 right-10 p-5 rounded-full bg-main-light hover:bg-main hidden md:block"
        onClick={handleOpen}
      >
        Add new
      </button>
      <button
        className="fixed bottom-10 right-10 p-3 rounded-full bg-main-light hover:bg-main  md:hidden"
        onClick={handleOpen}
      >
        <PlusIcon />
      </button>
      {isOpened && <NewNoteDialog onClose={() => setIsOpened(false)} />}
    </>
  );
};

export default NewNoteButton;
