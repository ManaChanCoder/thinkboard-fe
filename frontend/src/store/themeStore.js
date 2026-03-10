import { create } from "zustand";
import { persist } from "zustand/middleware";

export const themeStore = create(
  persist(
    (set) => ({
      isDark: false,

      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: "theme-storage",
    },
  ),
);
