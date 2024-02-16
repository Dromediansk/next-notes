import { FC, FocusEvent, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Note } from "@prisma/client";
import { deleteNoteInDb, updateNoteInDb } from "@/services/notes";
import { useRouter } from "next/navigation";
import { CustomEditor } from "../editor";
import Markdown from "react-markdown";

type StickyNoteDialogProps = {
  note: Note;
  dialogOpen: boolean;
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
  dialogOpen,
  note,
}) => {
  const [inputValue, setInputValue] = useState(note.text);
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const inputRef = useRef(null);

  const textLength = note.text.length;

  const handleClose = async () => {
    try {
      if (!inputValue) {
        await deleteNoteInDb(note.id);
      } else if (inputValue !== note.text) {
        await updateNoteInDb(note.id, inputValue);
      }
      setDialogOpen(false);
      setEditMode(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Apply on MDX Editor
  const handleFocus = ({
    currentTarget,
  }: FocusEvent<HTMLTextAreaElement, Element>) => {
    currentTarget.setSelectionRange(
      currentTarget.value.length,
      currentTarget.value.length
    );
    currentTarget.scrollTop = currentTarget.scrollHeight;
  };

  return (
    <Transition.Root show={dialogOpen} as={Fragment}>
      <Dialog as="div" className=" z-10" onClose={handleClose}>
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
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-2xl">
                <div
                  className={`text-center bg-white rounded-lg overflow-auto ${determineDialogSizeByTextLength(
                    textLength
                  )}`}
                >
                  {editMode ? (
                    <CustomEditor
                      markdown={inputValue}
                      onChange={setInputValue}
                      autoFocus
                      ref={inputRef}
                    />
                  ) : (
                    <div
                      onClick={() => setEditMode(true)}
                      className="text-center w-full p-4 pt-14"
                    >
                      <Markdown>{note.text}</Markdown>
                    </div>
                  )}
                </div>
                <div className="p-2 text-right">
                  <button
                    className="hover:bg-gray-200 px-4 py-2 transition duration-300 rounded"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StickyNoteDialog;
