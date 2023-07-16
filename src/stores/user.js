import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      sub: "",
      wholeSub: "",
      setSub: (sub) => set({ sub: sub }),
      setWholeSub: (sub) => set({ wholeSub: sub }),
    }),
    {
      name: "userStore",
    }
  )
);
