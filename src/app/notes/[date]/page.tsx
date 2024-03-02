import FormContainer from "@/components/form/FormContainer";
import StickyNotesList from "@/components/stickyNote/StickyNotesList";
import { getCategories } from "@/services/categories";
import { getNotesByDate } from "@/services/notes";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";

type PageProps = {
  params: { date: string };
};

const Page: FC<PageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/login");
  }
  const notes = await getNotesByDate(session.user?.id, params.date);
  const categories = await getCategories();

  return (
    <div>
      <FormContainer session={session} categories={categories} />
      <StickyNotesList fetchedNotes={notes} categories={categories} />
    </div>
  );
};

export default Page;
