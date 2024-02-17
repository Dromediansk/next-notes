import { Note } from "@prisma/client";
import { FC, useState } from "react";
import StickyNoteFooter from "./StickyNoteFooter";
import StickyNoteDialog from "./StickyNoteDialog";
import NoteText from "./NoteText";

type StickyNoteProps = {
  note: Note;
};

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        className="gap-4 shadow-lg rounded flex flex-col justify-between group"
        style={{ backgroundColor: note.color }}
      >
        <NoteText text={note.text} onClick={() => setDialogOpen(true)} />
        <StickyNoteFooter noteId={note.id} setDialogOpen={setDialogOpen} />
      </div>
      <StickyNoteDialog
        note={note}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

export default StickyNote;
