import { FC } from "react";
import { NOTE_TEMPORARY_COLOR, getContrastColor } from "@/utils/colors";
import { NoteWithCategory } from "@/utils/types/prisma";
import StickyNoteText from "./StickyNoteText";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import OptionsIcon from "@/lib/icons/OptionsIcon";
import EditIcon from "@/lib/icons/EditIcon";
import DeleteIcon from "@/lib/icons/DeleteIcon";

type StickyNoteProps = {
  note: NoteWithCategory;
  setDialogOpenId: (noteId: string | null) => void;
  onDelete: () => void;
};

const menuItemClassName =
  "p-2 cursor-pointer flex gap-2 items-center transition-colors duration-300";

const StickyNote: FC<StickyNoteProps> = ({
  note,
  setDialogOpenId,
  onDelete,
}) => {
  const {
    category: { lightColor },
    isTemporary,
    text,
  } = note;

  const backgroundColor = isTemporary ? NOTE_TEMPORARY_COLOR : lightColor;
  const color = getContrastColor(backgroundColor);

  return (
    <div
      className="m-auto w-full max-w-72 sm:w-72 md:w-60 max-h-40 min-w-40 shadow-lg rounded flex flex-1 flex-col justify-between group "
      style={{ backgroundColor, color }}
    >
      <StickyNoteText
        isTemporary={isTemporary}
        text={text}
        onClick={() => setDialogOpenId(note.id)}
      />

      <footer className="m-2 h-5 flex justify-end">
        <Menu>
          <MenuButton
            disabled={note.isTemporary}
            className={`${
              note.isTemporary ? "hidden" : "invisible group-hover:visible"
            }`}
          >
            <OptionsIcon />
          </MenuButton>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute flex flex-col bg-white rounded shadow-md">
              <MenuItem>
                {({ focus }) => (
                  <span
                    className={`${menuItemClassName} text-gray-800 ${
                      focus ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setDialogOpenId(note.id)}
                  >
                    <EditIcon />
                    <span>Update</span>
                  </span>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <span
                    className={`${menuItemClassName} text-red-500 ${
                      focus ? "bg-gray-200" : ""
                    }`}
                    onClick={onDelete}
                  >
                    <DeleteIcon />
                    <span>Delete</span>
                  </span>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </footer>
    </div>
  );
};

export default StickyNote;
