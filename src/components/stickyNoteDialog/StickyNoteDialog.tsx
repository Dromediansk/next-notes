import { FC, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Note } from "@prisma/client";
import {
  deleteNoteInDb,
  refetchNotesByDate,
  updateNoteInDb,
} from "@/services/notes";
import { redirect, useParams } from "next/navigation";
import { CustomEditor } from "../editor";
import Markdown from "react-markdown";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { NoteFormState, RouteParams } from "@/utils/types/common";
import CloseIcon from "../../lib/icons/CloseIcon";
import CategorySelect from "../form/CategorySelect";
import { setIsLoadingNotes, setNotes } from "@/stores/notes";
import { LOGIN_ROUTE } from "@/utils/constants";
import { getUser } from "@/stores/user";

type StickyNoteDialogProps = {
  note: Note;
  setDialogOpen: (state: boolean) => void;
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
}) => {
  const [formState, setFormState] = useState<NoteFormState>({
    text: note.text,
    categoryId: note.categoryId,
  });
  const [editMode, setEditMode] = useState(false);
  const { text, categoryId } = formState;

  const params = useParams<RouteParams>();
  const inputRef = useRef<MDXEditorMethods>(null);

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

      if (!text) {
        await deleteNoteInDb(note.id);
      } else if (text !== note.text || categoryId !== note.categoryId) {
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
                    note.text.length
                  )}`}
                >
                  {editMode ? (
                    <CustomEditor
                      markdown={text}
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
                    onChange={handleChangeCategory}
                    selectedCategoryId={categoryId}
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
