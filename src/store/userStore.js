import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set, get) => ({
      user: {},
      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "user-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
