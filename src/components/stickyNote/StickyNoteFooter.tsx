import { Menu, Transition } from "@headlessui/react";
import OptionsIcon from "../icons/OptionsIcon";
import { FC, Fragment } from "react";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteNoteInDb, getNotesByDate } from "@/services/notes";
import { redirect, useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { LOGIN_ROUTE } from "@/utils/constants";
import { RouteParams } from "@/utils/types/common";
import { setIsLoadingNotes, setNotes } from "@/stores/notes";

type StickyNoteFooterProps = {
  noteId: string;
  setDialogOpen: (state: boolean) => void;
};

const menuItemClassName =
  "p-2 cursor-pointer flex gap-2 items-center transition-colors duration-300";

const StickyNoteFooter: FC<StickyNoteFooterProps> = ({
  noteId,
  setDialogOpen,
}) => {
  const params = useParams<RouteParams>();

  const handleDeleteNote = async () => {
    try {
      setIsLoadingNotes(true);
      const session = await getSession();

      if (!session || !session.user) {
        return redirect(LOGIN_ROUTE);
      }

      await deleteNoteInDb(noteId);
      const notes = await getNotesByDate(session.user.id, params.date);
      setNotes(notes);
    } catch (error) {
      console.log("Error deleting note ", error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  return (
    <footer className="m-2 h-5 flex justify-end">
      <Menu>
        <Menu.Button className="invisible group-hover:visible">
          <OptionsIcon />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute flex flex-col bg-white rounded shadow-md">
            <Menu.Item>
              {({ active }) => (
                <span
                  className={`${menuItemClassName} text-gray-800 ${
                    active ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setDialogOpen(true)}
                >
                  <EditIcon />
                  <span>Update</span>
                </span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span
                  className={`${menuItemClassName} text-red-500 ${
                    active ? "bg-gray-200" : ""
                  }`}
                  onClick={handleDeleteNote}
                >
                  <DeleteIcon />
                  <span>Delete</span>
                </span>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </footer>
  );
};

export default StickyNoteFooter;
