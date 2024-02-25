import { FC, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Category, Note } from "@prisma/client";
import { deleteNoteInDb, updateNoteInDb } from "@/services/notes";
import { useRouter } from "next/navigation";
import { CustomEditor } from "../editor";
import Markdown from "react-markdown";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { NoteFormState } from "@/utils/types/common";
import CloseIcon from "../icons/CloseIcon";
import CategorySelect from "../form/CategorySelect";

type StickyNoteDialogProps = {
  note: Note;
  setDialogOpen: (state: boolean) => void;
  categories: Category[];
};

const determineDialogSizeByTextLength = (textLength: number) => {
  if (textLength >= 2000) {
    return "h-[70vh]";
  }
  return "h-[40vh]";
};

const StickyNoteDialog: FC<StickyNoteDialogProps> = ({
  setDialogOpen,
  note,
  categories,
}) => {
  const [formState, setFormState] = useState<NoteFormState>({
    text: note.text,
    categoryId: note.categoryId,
  });
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const inputRef = useRef<MDXEditorMethods>(null);

  const textLength = note.text.length;

  const handleClose = async () => {
    try {
      if (!formState.text) {
        await deleteNoteInDb(note.id);
      } else if (
        formState.text !== note.text ||
        formState.categoryId !== note.categoryId
      ) {
        await updateNoteInDb(note.id, formState);
      }
      setDialogOpen(false);
      setEditMode(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeNoteText = (markdown: string) => {
    setFormState((prevState) => ({
      ...prevState,
      text: markdown,
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
      <Dialog open as="div" className=" z-10" onClose={handleClose}>
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
                className="relative transform rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-2xl"
                autoFocus
              >
                <button
                  className="hover:text-gray-200 text-white px-4 py-2 transition duration-300 rounded absolute top-[-50px] right-0 focus:outline-none"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </button>
                <div
                  className={`text-center bg-white rounded-lg overflow-auto ${determineDialogSizeByTextLength(
                    textLength
                  )}`}
                >
                  {editMode ? (
                    <CustomEditor
                      markdown={formState.text}
                      onChange={handleChangeNoteText}
                      autoFocus={{ defaultSelection: "rootEnd" }}
                      ref={inputRef}
                    />
                  ) : (
                    <div
                      onClick={() => setEditMode(true)}
                      className="text-center w-full p-4 pt-14 cursor-pointer"
                    >
                      <Markdown>{note.text}</Markdown>
                    </div>
                  )}
                </div>
                <footer className="p-2">
                  <CategorySelect
                    categories={categories}
                    onChange={handleChangeCategory}
                    selectedCategoryId={formState.categoryId}
                    itemsClassName="-top-32"
                  />
                </footer>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StickyNoteDialog;
