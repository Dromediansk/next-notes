import InitialClientContainer from "@/components/InitialClientContainer";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { getCategories } from "@/services/categories";
import { getNotes } from "@/services/notes";
import { Filter } from "@/utils/types/common";
import { FC } from "react";

type PageProps = {
  searchParams: Filter;
};

const Page: FC<PageProps> = async ({ searchParams }) => {
  const session = await useAuthenticatedSession();

  const notes = await getNotes({
    date: searchParams.date,
  });
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
