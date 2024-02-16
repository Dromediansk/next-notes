import AddNewNoteForm from "./CreateNewNoteForm";
import CustomDatePicker from "./CustomDatePicker";
import { useAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const FormContainer = async () => {
  const session = await useAuthSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center my-4 sm:my-10">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Date:</span>
        <CustomDatePicker />
      </div>
      {session.user && <AddNewNoteForm user={session.user} />}
    </div>
  );
};

export default FormContainer;
