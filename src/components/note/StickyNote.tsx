import { Note } from "@prisma/client";
import { FC, useState } from "react";
import StickyNoteFooter from "./StickyNoteFooter";
import StickyNoteDialog from "./StickyNoteDialog";
import NoteText from "./NoteText";
import { getContrastColor } from "@/utils/colors";

type StickyNoteProps = {
  note: Note;
};

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const textColor = getContrastColor(note.color);

  return (
    <>
      <div
        className="gap-4 shadow-lg rounded flex flex-col justify-between group"
        style={{ backgroundColor: note.color, color: textColor }}
      >
        <NoteText text={note.text} onClick={() => setDialogOpen(true)} />
        <StickyNoteFooter noteId={note.id} setDialogOpen={setDialogOpen} />
      </div>
      {dialogOpen && (
        <StickyNoteDialog
          note={note}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </>
  );
};

export default StickyNote;
