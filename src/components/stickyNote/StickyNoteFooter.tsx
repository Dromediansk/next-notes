import { Menu, Transition } from "@headlessui/react";
import OptionsIcon from "../icons/OptionsIcon";
import { FC, Fragment } from "react";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { useRouter } from "next/navigation";
import { deleteNoteInDb } from "@/services/notes";

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
  const router = useRouter();

  const handleDeleteNote = async () => {
    try {
      await deleteNoteInDb(noteId);
      router.refresh();
    } catch (error) {
      console.log("Error deleting note ", error);
    }
  };

  return (
    <footer className="m-2 h-5 flex justify-end">
      <Menu>
        <Menu.Button className="hidden group-hover:block">
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
                  className={`${menuItemClassName} ${
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
