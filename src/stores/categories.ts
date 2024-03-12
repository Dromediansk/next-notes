import { Category } from "@prisma/client";
import { create } from "zustand";

type CategoryStore = {
  categories: Category[]
}

const useCategoriesStore = create<CategoryStore>(() => ({
  categories: [],
}))

export const setCategories = (categories: Category[]) => useCategoriesStore.setState({ categories })

export const getCategories = () => useCategoriesStore.getState().categories

export const useCategories = () => useCategoriesStore()

