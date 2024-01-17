import { create } from "zustand";

export const useSystemStore = create((set, get) => ({
    env: null,
    setValue: (property, value) => set({ [property]: value }),
}));
