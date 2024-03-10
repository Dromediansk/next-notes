import { DefaultUser } from "next-auth";
import { create } from "zustand";

type UserStore = {
  user: DefaultUser | null
  isLoading: boolean
}

const useUserStore = create<UserStore>(() => ({
  user: null,
  isLoading: true,
}))

export const setUser = (user: DefaultUser) => useUserStore.setState({ user })

export const getUser = () => useUserStore.getState().user

export const useUser = () => useUserStore()

export const setIsLoadingUser = (isLoading: boolean) => useUserStore.setState({ isLoading })

