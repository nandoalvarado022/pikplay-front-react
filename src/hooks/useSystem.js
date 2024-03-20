import { create } from 'zustand';

const initialNotification = {
    "nid": 0,
    "uid": 0,
    "detail": "Ingresa con tu # de celu y obtén 15 Pikcoins para poder redimirlos en compras 🤩",
    "coins": null,
    "type_id": "",
    "status": 0,
    "created_at": "2022-04-11T20:33:30.000Z",
    "action": "login",
}

const loadFromLocalStorage = (property) => {
    let value = null
    if (typeof window != 'undefined') {
        value = localStorage.getItem('userLogged') ? JSON.parse(localStorage.getItem('userLogged')) : value
    }
    return value
}

const logout = (set) => {
    set({ userLogged: { uid: null } })
    set({ notifications: [initialNotification] })
}

const useSystemStore = create((set, get) => ({
    env: null,
    logout: () => logout(set),
    notifications: [initialNotification],
    userLogged: loadFromLocalStorage() || { uid: null },
    setValue: (property, value) => {
        localStorage.setItem([property], JSON.stringify(value))
        set({ [property]: value })
    },
    setUserLogged: (user) => set({ userLogged: user })
}));

export default useSystemStore
