import { FC, useState } from "react";
import { Note } from "@prisma/client";
import {
  deleteNoteInDb,
  refetchNotesByDate,
  updateNoteInDb,
} from "@/services/notes";
import { redirect, useParams } from "next/navigation";
import { CustomEditor } from "../editor";
import Markdown from "react-markdown";
import { NoteFormState, RouteParams } from "@/utils/types/common";
import CategorySelect from "../newNote/CategorySelect";
import { getNotes, setIsLoadingNotes, setNotes } from "@/stores/notes";
import { LOGIN_ROUTE } from "@/utils/constants";
import { getUser } from "@/stores/user";
import { useCategories } from "@/stores/categories";
import FormDialog from "@/lib/FormDialog";
import CheckIcon from "@/lib/icons/CheckIcon";
import { getColorStyles } from "@/utils/colors";

type StickyNoteDialogProps = {
  note: Note;
  setDialogOpen: (state: boolean) => void;
};

const determineDialogSizeByTextLength = (textLength: number) => {
  if (textLength >= 1000) {
    return "70vh";
  }
  return "40vh";
};

const StickyNoteDialog: FC<StickyNoteDialogProps> = ({
  setDialogOpen,
  note,
}) => {
  const [formState, setFormState] = useState<NoteFormState>({
    text: note.text,
    categoryId: note.categoryId,
  });
  const [editMode, setEditMode] = useState(false);
  const { text, categoryId } = formState;

  const { categories } = useCategories();
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );
  const selectedCategoryColor = selectedCategory?.lightColor || "#d1d5db";
  const colorStyles = getColorStyles(selectedCategoryColor);

  const params = useParams<RouteParams>();

  const handleClose = async () => {
    try {
      setEditMode(false);
      setDialogOpen(false);

      const isValid =
        text === "" || text !== note.text || categoryId !== note.categoryId;

      if (!isValid) {
        return;
      }

      setIsLoadingNotes(true);

      const user = getUser();
      if (!user) {
        return redirect(LOGIN_ROUTE);
      }

      const notes = getNotes();
      const noteToModify = notes.find((item) => item.id === note.id);

      if (!text) {
        if (noteToModify) {
          const newNotes = notes.filter((note) => note.id !== noteToModify.id);
          setNotes(newNotes);
          await deleteNoteInDb(note.id);
        }
      } else if (text !== note.text || categoryId !== note.categoryId) {
        const newNotes = [...notes];
        const noteIndex = newNotes.findIndex((item) => item.id === note.id);
        newNotes[noteIndex] = {
          ...newNotes[noteIndex],
          text,
          categoryId,
        };
        setNotes(newNotes);
        await updateNoteInDb(note.id, formState);
      }

      await refetchNotesByDate(user.id, params.date);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleChangeNoteText = (markdown: string) => {
    setFormState((prevState) => ({
      ...prevState,
      text: markdown,
    }));
  };

  return (
    <FormDialog onClose={handleClose}>
      <div
        className="text-center rounded-t overflow-y-auto"
        style={{
          ...colorStyles,
          height: determineDialogSizeByTextLength(note.text.length),
        }}
      >
        {editMode ? (
          <CustomEditor
            markdown={text}
            onChange={handleChangeNoteText}
            autoFocus={{ defaultSelection: "rootEnd" }}
          />
        ) : (
          <div
            onClick={() => setEditMode(true)}
            className="text-center w-full h-full cursor-pointer"
          >
            <Markdown className="p-5">{note.text}</Markdown>
          </div>
        )}
      </div>
      {editMode && (
        <footer
          className="p-2 flex items-center justify-between"
          style={colorStyles}
        >
          <CategorySelect
            setFormState={setFormState}
            selectedCategoryId={categoryId}
            itemsClassName="-top-32"
          />
          <button
            onClick={handleClose}
            className="text-gray-500 disabled:text-gray-200"
          >
            <CheckIcon />
          </button>
        </footer>
      )}
    </FormDialog>
  );
};

export default StickyNoteDialog;
