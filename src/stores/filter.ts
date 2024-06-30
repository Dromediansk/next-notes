import dayjs from "dayjs";
import { create } from "zustand";

type FilterStore = {
  date: string | null;
  categoryId: string | null;
};

const useFilterStore = create<FilterStore>(() => ({
  date: dayjs().format("YYYY-MM-DD"),
  categoryId: null,
}));

export const setFilter = (filter: FilterStore) =>
  useFilterStore.setState(filter);

export const getFilter = () => useFilterStore.getState();

export const useFilter = () => useFilterStore();
