import InitialClientContainer from "@/components/InitialClientContainer";
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
    <InitialClientContainer
      fetchedUser={session.user}
      fetchedCategories={categories}
      fetchedNotes={notes}
    />
  );
};

export default Page;
