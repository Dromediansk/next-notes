import { Filter } from "@/utils/types/common";
import dayjs from "dayjs";
import { create } from "zustand";

const useFilterStore = create<Filter>(() => ({
  date: dayjs().format("YYYY-MM-DD"),
  categoryId: null,
}));

export const setFilter = (filter: Filter) => useFilterStore.setState(filter);

export const getFilter = () => useFilterStore.getState();

export const useFilter = () => useFilterStore();
