import { create } from "zustand";
import { persist } from "zustand/middleware";

export const authStore = create(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "authStore",
    }
  )
);
