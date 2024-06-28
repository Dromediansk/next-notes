import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { FC, ReactNode } from "react";

type FormDialogProps = {
  onClose: () => void;
  children: ReactNode;
  dialogPosition?: string;
};

const FormDialog: FC<FormDialogProps> = ({
  onClose,
  children,
  dialogPosition = "top-5 md:inset-0",
}) => {
  return (
    <Transition
      show
      appear
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog open as="div" className=" z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className={`fixed z-10 w-screen ${dialogPosition}`}>
          <div className="flex min-h-full items-center justify-center p-2 text-center">
            <DialogPanel
              className="relative transform bg-white rounded shadow-xl transition-all w-full max-w-2xl"
              autoFocus
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FormDialog;
