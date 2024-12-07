import InitialClientContainer from "@/components/InitialClientContainer";
import { getCategories } from "@/services/categories";
import { getNotes } from "@/services/notes";
import { getAuthenticatedSession } from "@/utils/auth";
import { Filter } from "@/utils/types/common";
import { FC } from "react";

type PageProps = {
  searchParams: Promise<Filter>;
};

const Page: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;

  const [session, notes, categories] = await Promise.all([
    getAuthenticatedSession(),
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
