import { FC, useState } from "react";
import StickyNoteFooter from "./StickyNoteFooter";
import { NOTE_TEMPORARY_COLOR, getContrastColor } from "@/utils/colors";
import { NoteWithCategory } from "@/utils/types/prisma";
import StickyNoteDialog from "./StickyNoteDialog";
import StickyNoteText from "./StickyNoteText";

type StickyNoteProps = {
  note: NoteWithCategory;
};

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const {
    category: { lightColor },
    isTemporary,
    text,
  } = note;

  const [dialogOpen, setDialogOpen] = useState(false);

  const backgroundColor = isTemporary ? NOTE_TEMPORARY_COLOR : lightColor;
  const color = getContrastColor(backgroundColor);

  const handleDialogOpen = () => {
    if (isTemporary) {
      return;
    }
    setDialogOpen(true);
  };

  return (
    <>
      <div
        className="m-auto w-full max-w-72 sm:w-72 md:w-60 max-h-40 min-w-40 shadow-lg rounded flex flex-1 flex-col justify-between group "
        style={{ backgroundColor, color }}
      >
        <StickyNoteText
          isTemporary={isTemporary}
          text={text}
          onClick={handleDialogOpen}
        />
        <StickyNoteFooter note={note} setDialogOpen={setDialogOpen} />
      </div>
      {dialogOpen && (
        <StickyNoteDialog note={note} setDialogOpen={setDialogOpen} />
      )}
    </>
  );
};

export default StickyNote;
