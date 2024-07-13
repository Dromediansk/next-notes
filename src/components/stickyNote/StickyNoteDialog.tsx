import { FC, useState } from "react";
import { Note } from "@prisma/client";
import { deleteNoteInDb, updateNoteInDb } from "@/services/notes";
import { redirect } from "next/navigation";
import Editor from "../editor";
import Markdown from "react-markdown";
import { NoteFormState } from "@/utils/types/common";
import CategorySelect from "../newNote/CategorySelect";
import { LOGIN_ROUTE } from "@/utils/constants";
import { getUser } from "@/stores/user";
import { useCategories } from "@/stores/categories";
import FormDialog from "@/lib/FormDialog";
import CheckIcon from "@/lib/icons/CheckIcon";
import { getColorStyles } from "@/utils/colors";
import CloseIcon from "@/lib/icons/CloseIcon";
import { useNoteStore } from "@/providers/notes.provider";

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

const StickyNoteDialog: FC<StickyNoteDialogProps> = ({
  onDialogClose,
  note,
}) => {
  const { notes, setNotes, setIsLoadingNotes } = useNoteStore((state) => state);

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

      const noteFound = notes.find((item) => item.id === note.id);
      if (!noteFound) {
        return;
      }

      if (!text) {
        // Delete note if text is empty
        const newNotes = notes.filter((note) => note.id !== noteFound.id);
        setNotes(newNotes);
        await deleteNoteInDb(note.id);
      }

      if (text !== note.text || categoryId !== note.categoryId) {
        // Update note if text or category is different
        const newNotes = [...notes];

        noteFound.text = text;
        noteFound.categoryId = categoryId;
        selectedCategory && (noteFound.category = selectedCategory);

        // Move the updated note to the top of the list
        newNotes.unshift(...newNotes.splice(newNotes.indexOf(noteFound), 1));

        setNotes(newNotes);
        await updateNoteInDb(note.id, formState);
      }
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
