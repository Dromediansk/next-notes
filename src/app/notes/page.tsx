import InitialClientContainer from "@/components/InitialClientContainer";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { getCategories } from "@/services/categories";
import { getNotes } from "@/services/notes";
import { Filter } from "@/utils/types/common";
import { FC } from "react";

type PageProps = {
  searchParams: Filter;
};

const Page: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;

  const [session, notes, categories] = await Promise.all([
    useAuthenticatedSession(),
    getNotes({
      date: searchParams.date,
    }),
    getCategories(),
  ]);

  return (
    <InitialClientContainer
      fetchedUser={session.user}
      fetchedCategories={categories}
      fetchedNotes={notes}
    />
  );
};

export default Page;
