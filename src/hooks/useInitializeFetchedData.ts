import { setCategories } from "@/stores/categories";
import { setIsLoadingNotes, setNotes } from "@/stores/notes";
import { setUser } from "@/stores/user";
import { NoteWithCategory } from "@/utils/types/prisma";
import { Category } from "@prisma/client";
import { DefaultUser } from "next-auth";
import { useEffect } from "react";

type UseInitializeFetchedDataParams = {
  fetchedNotes: NoteWithCategory[];
  fetchedCategories: Category[];
  fetchedUser: DefaultUser;
}

export const useInitializeFetchedData = ({ fetchedNotes, fetchedUser, fetchedCategories }: UseInitializeFetchedDataParams) => {
  useEffect(() => {
    setNotes(fetchedNotes);
    setIsLoadingNotes(false);
  }, [fetchedNotes]);

  useEffect(() => {
    setUser(fetchedUser);
  }, [fetchedUser]);

  useEffect(() => {
    setCategories(fetchedCategories)
  }, [fetchedCategories])
}