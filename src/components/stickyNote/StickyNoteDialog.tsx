import { FC, useState } from "react";
import { Note } from "@prisma/client";
import { deleteNoteInDb, refetchNotes, updateNoteInDb } from "@/services/notes";
import { redirect } from "next/navigation";
import Editor from "../editor";
import Markdown from "react-markdown";
import { NoteFormState } from "@/utils/types/common";
import CategorySelect from "../newNote/CategorySelect";
import { getNotes, setIsLoadingNotes, setNotes } from "@/stores/notes";
import { LOGIN_ROUTE } from "@/utils/constants";
import { getUser } from "@/stores/user";
import { useCategories } from "@/stores/categories";
import FormDialog from "@/lib/FormDialog";
import CheckIcon from "@/lib/icons/CheckIcon";
import { getColorStyles } from "@/utils/colors";
import CloseIcon from "@/lib/icons/CloseIcon";
import { getFilter } from "@/stores/filter";

type StickyNoteDialogProps = {
  note: Note;
  onDialogClose: () => void;
};

const determineDialogSizeByTextLength = (textLength: number) => {
  if (textLength >= 1000) {
    return "70vh";
  }
  return "40vh";
};

const date = getFilter().date;

const StickyNoteDialog: FC<StickyNoteDialogProps> = ({
  onDialogClose,
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

  const handleClose = async () => {
    try {
      setEditMode(false);
      onDialogClose();

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

      await refetchNotes({ date });
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
    <FormDialog
      onClose={handleClose}
      dialogPosition={editMode ? "top-5 md:inset-0" : "inset-0"} // positioning the dialog on mobile screens. If the edit mode is active, the dialog will be positioned at the top of the screen due to mobile keyboard.
    >
      {!editMode && (
        <button
          className="hover:text-gray-200 text-white px-4 py-2 transition duration-300 rounded absolute top-[-50px] right-0 focus:outline-none"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
      )}
      <div
        className="text-center rounded-t overflow-y-auto"
        style={{
          ...colorStyles,
          height: determineDialogSizeByTextLength(note.text.length),
        }}
      >
        {editMode ? (
          <Editor
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

      <footer
        className="p-2 flex items-center justify-between rounded-b"
        style={colorStyles}
      >
        {editMode && (
          <>
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
          </>
        )}
      </footer>
    </FormDialog>
  );
};

export default StickyNoteDialog;
