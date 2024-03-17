import CloseIcon from "@/lib/icons/CloseIcon";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, FC, Fragment, SyntheticEvent, useState } from "react";
import CategorySelect from "./CategorySelect";
import { NoteFormState, RouteParams } from "@/utils/types/common";
import { useCategories } from "@/stores/categories";
import { addNote, setIsLoadingNotes } from "@/stores/notes";
import { getUser } from "@/stores/user";
import { redirect, useParams } from "next/navigation";
import { LOGIN_ROUTE } from "@/utils/constants";
import { NoteWithCategory } from "@/utils/types/prisma";
import { v4 as uuidv4 } from "uuid";
import { createNoteInDb, refetchNotesByDate } from "@/services/notes";
import { getContrastColor } from "@/utils/colors";
import CheckIcon from "@/lib/icons/CheckIcon";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

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

  const params = useParams<RouteParams>();

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      onClose();
      setIsLoadingNotes(true);

      const category = categories.find((c) => c.id === formState.categoryId);

      if (!category) {
        throw new Error("Category not found!");
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
        createdAt: new Date(params.date),
        updatedAt: new Date(params.date),
        orderNumber: 1,
        isTemporary: true,
      };
      addNote(newNote);

      setFormState((prevState) => ({
        ...defaultFormState,
        categoryId: prevState.categoryId,
      }));
      await createNoteInDb(formState, user.id, params.date, 1);
      await refetchNotesByDate(user.id, params.date);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleChangeFormState = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCategory = (categoryId: number) => {
    setFormState((prevState) => ({
      ...prevState,
      categoryId,
    }));
  };

  return (
    <Transition.Root show as={Fragment}>
      <Dialog open as="div" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform rounded bg-white text-left shadow-xl transition-all w-full max-w-2xl"
                autoFocus
              >
                <button
                  className="hover:text-gray-200 text-white px-4 py-2 transition duration-300 rounded absolute top-[-50px] right-0 focus:outline-none"
                  onClick={onClose}
                >
                  <CloseIcon />
                </button>
                <div
                  className={`text-center bg-white rounded-t overflow-auto h-[40vh]`}
                >
                  <textarea
                    className="w-full h-full p-5 outline-none resize-none"
                    style={{
                      backgroundColor: selectedCategoryColor,
                      color: getContrastColor(selectedCategoryColor),
                    }}
                    placeholder="What did you learn?"
                    onChange={handleChangeFormState}
                    value={formState.text}
                    name="text"
                    autoFocus
                  />
                </div>
                <footer className="p-2 flex items-center justify-between">
                  <CategorySelect
                    selectedCategoryId={formState.categoryId}
                    onChange={handleChangeCategory}
                    itemsClassName="-top-32"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!formState.text}
                    className="text-gray-500 disabled:text-gray-200"
                  >
                    <CheckIcon />
                  </button>
                </footer>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewNoteDialog;
