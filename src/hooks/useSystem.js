import { create } from "zustand";

export const useSystemStore = create((set, get) => ({
    env: null,
    userLogged: { userID: 2, fullName: "Test User" },
    setValue: (property, value) => set({ [property]: value }),
    setUserLogged: (user) => set({ userLogged: user })
}));
