import { FC, useState } from "react";
import StickyNoteFooter from "./StickyNoteFooter";
import { getContrastColor } from "@/utils/colors";
import { NoteWithCategory } from "@/utils/types/prisma";
import StickyNoteDialog from "../stickyNoteDialog/StickyNoteDialog";
import { Category } from "@prisma/client";
import StickyNoteText from "./StickyNoteText";

type StickyNoteProps = {
  note: NoteWithCategory;
  categories: Category[];
};

const StickyNote: FC<StickyNoteProps> = ({ note, categories }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { lightColor } = note.category;

  const textColor = getContrastColor(lightColor);

  return (
    <>
      <div
        className="m-auto w-full max-w-72 sm:w-72 md:w-60 max-h-40 min-w-40 shadow-lg rounded flex flex-1 flex-col justify-between group "
        style={{ backgroundColor: lightColor, color: textColor }}
      >
        <StickyNoteText text={note.text} onClick={() => setDialogOpen(true)} />
        <StickyNoteFooter noteId={note.id} setDialogOpen={setDialogOpen} />
      </div>
      {dialogOpen && (
        <StickyNoteDialog
          note={note}
          setDialogOpen={setDialogOpen}
          categories={categories}
        />
      )}
    </>
  );
};

export default StickyNote;
