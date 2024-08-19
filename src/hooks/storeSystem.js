import cookieCutter from '@boiseitguru/cookie-cutter'
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
        value = localStorage.getItem(property) ? JSON.parse(localStorage.getItem(property)) : value
    }
    return value
}

const logout = (set) => {
    localStorage.clear()
    set({ userLogged: { uid: null } })
    set({ notifications: [initialNotification] })
    cookieCutter.set('X-Auth-Token', null)
    cookieCutter.set('User-ID', null)
    cookieCutter.set('userLogged', { uid: 0 })
}

const useSystemStore = create((set, get) => ({
    darkMode: true,
    env: null,
    experiences: [],
    isAwardSummaryModalOpen: false,
    isOnboardingProcess: false,
    awardsSummaryModalHTML: null,
    logout: () => logout(set),
    notifications: [initialNotification],
    newNotifications: true,
    userLogged: loadFromLocalStorage('userLogged') || { uid: null },
    perfilPage: {
        messageIA: null
    },
    setStoreValue: (property, value) => {
        debugger;
        localStorage.setItem([property], JSON.stringify(value))
        set({ [property]: value })
    },
    setUserLogged: (data) => {
        set(state => ({ userLogged: { ...state.userLogged, ...data } }))
    }
}));

export default useSystemStore
