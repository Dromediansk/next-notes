import { FC, useState } from "react";
import StickyNoteFooter from "./StickyNoteFooter";
import { getContrastColor } from "@/utils/colors";
import { NoteWithCategory } from "@/utils/types/prisma";
import StickyNoteDialog from "../stickyNoteDialog/StickyNoteDialog";
import StickyNoteText from "./StickyNoteText";

type StickyNoteProps = {
  note: NoteWithCategory;
};

const determineColor = (
  isTemporary: boolean | undefined,
  lightColor: string
) => {
  return isTemporary ? "#d1d5db" : lightColor;
};

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { lightColor } = note.category;

  const color = determineColor(note.isTemporary, lightColor);
  const textColor = getContrastColor(color);

  const handleDialogOpen = () => {
    if (note.isTemporary) {
      return;
    }
    setDialogOpen(true);
  };

  return (
    <>
      <div
        className="m-auto w-full max-w-72 sm:w-72 md:w-60 max-h-40 min-w-40 shadow-lg rounded flex flex-1 flex-col justify-between group "
        style={{ backgroundColor: color, color: textColor }}
      >
        <StickyNoteText
          isTemporary={note.isTemporary}
          text={note.text}
          onClick={handleDialogOpen}
        />
        <StickyNoteFooter note={note} setDialogOpen={setDialogOpen} />
      </div>
      {dialogOpen && (
        <StickyNoteDialog
          note={note}
          setDialogOpen={setDialogOpen}
        />
      )}
    </>
  );
};

export default StickyNote;
