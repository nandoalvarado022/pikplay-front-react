import { create } from 'zustand';

const loadFromLocalStorage = (property) => {
    let value = null
    if (typeof window != 'undefined') {
        value = localStorage.getItem('userLogged') ? JSON.parse(localStorage.getItem('userLogged')) : value
    }
    return value
}

const logout = (set) => {
    set({ userLogged: { id: null } })
    set({ notifications: [] })
}

const useSystemStore = create((set, get) => ({
    env: null,
    logout: () => logout(set),
    notifications: [],
    userLogged: loadFromLocalStorage() || { uid: null },
    setValue: (property, value) => {
        localStorage.setItem([property], JSON.stringify(value))
        set({ [property]: value })
    },
    setUserLogged: (user) => set({ userLogged: user })
}));

export default useSystemStore
