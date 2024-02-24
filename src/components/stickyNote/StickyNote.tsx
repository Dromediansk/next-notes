import { FC, useState } from "react";
import StickyNoteFooter from "./StickyNoteFooter";
import NoteText from "./StickyNoteText";
import { getContrastColor } from "@/utils/colors";
import { NoteWithCategory } from "@/utils/types/prisma";
import StickyNoteDialog from "../stickyNoteDialog/StickyNoteDialog";
import { Category } from "@prisma/client";

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
        className="gap-4 shadow-lg rounded flex flex-col justify-between group"
        style={{ backgroundColor: lightColor, color: textColor }}
      >
        <NoteText text={note.text} onClick={() => setDialogOpen(true)} />
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
