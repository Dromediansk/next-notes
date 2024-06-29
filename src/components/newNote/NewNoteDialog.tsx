import { FC, SyntheticEvent, useState } from "react";
import CategorySelect from "./CategorySelect";
import { NoteFormState } from "@/utils/types/common";
import { useCategories } from "@/stores/categories";
import { addNote, setIsLoadingNotes, setNotes } from "@/stores/notes";
import { getUser } from "@/stores/user";
import { redirect, useSearchParams } from "next/navigation";
import { LOGIN_ROUTE } from "@/utils/constants";
import { NoteWithCategory } from "@/utils/types/prisma";
import { v4 as uuidv4 } from "uuid";
import { createNoteInDb, getNotes } from "@/services/notes";
import CheckIcon from "@/lib/icons/CheckIcon";
import Editor from "../editor";
import FormDialog from "@/lib/FormDialog";
import { getColorStyles } from "@/utils/colors";

type NewNoteDialogProps = {
  onClose: () => void;
};

const defaultFormState: NoteFormState = {
  text: "",
  categoryId: 1, // PERSONAL
};

const NewNoteDialog: FC<NewNoteDialogProps> = ({ onClose }) => {
  const [formState, setFormState] = useState<NoteFormState>(defaultFormState);

  const { categories } = useCategories();
  const selectedCategory = categories.find(
    (category) => category.id === formState.categoryId
  );
  const selectedCategoryColor = selectedCategory?.lightColor || "#d1d5db";
  const colorStyles = getColorStyles(selectedCategoryColor);

  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      onClose();

      if (!formState.text) {
        return;
      }

      setIsLoadingNotes(true);

      const category = categories.find((c) => c.id === formState.categoryId);
      if (!category) {
        throw new Error("Category not found!");
      }
      if (!date) {
        throw new Error("Date not found!");
      }
      const user = getUser();
      if (!user) {
        redirect(LOGIN_ROUTE);
      }

      const newNote: NoteWithCategory = {
        ...formState,
        id: uuidv4(),
        category,
        authorId: user.id,
        createdAt: new Date(date),
        updatedAt: new Date(date),
        orderNumber: 1,
        isTemporary: true,
      };
      addNote(newNote);

      setFormState((prevState) => ({
        ...defaultFormState,
        categoryId: prevState.categoryId,
      }));
      await createNoteInDb(formState, user.id, date, 1);
      const data = await getNotes({ date });
      setNotes(data);
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
    <FormDialog onClose={onClose}>
      <div
        className="text-center rounded-t h-[40vh] overflow-y-auto overflow-x-hidden"
        style={colorStyles}
      >
        <Editor
          autoFocus
          markdown={formState.text}
          onChange={handleChangeNoteText}
        />
      </div>
      <footer
        className="p-2 flex items-center justify-between rounded-b"
        style={colorStyles}
      >
        <CategorySelect
          selectedCategoryId={formState.categoryId}
          setFormState={setFormState}
          itemsClassName="-top-32"
        />
        <button onClick={handleAddNote} className="text-gray-500">
          <CheckIcon />
        </button>
      </footer>
    </FormDialog>
  );
};

export default NewNoteDialog;
