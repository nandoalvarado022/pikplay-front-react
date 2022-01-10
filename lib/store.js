import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { configureStore, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { useMemo } from 'react'

let store

const initialState = {
    tick: 'init',
    coins: 0,
    current_date: new Date(),
    guide_step: 1, // guia de bienvenida de primeros usuarios
    isMobile: false,
    notifications: [],
    messageModal: { id: "empty" },
    checkedNotifications: typeof window != "undefined" && localStorage.getItem("checkedNotifications") ? JSON.parse(localStorage.getItem("checkedNotifications")) : [],
    selectedUser: null,
    user: typeof window != "undefined" && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {
        id: 0,
        name: "Nando",
        picture: "https://firebasestorage.googleapis.com/v0/b/mi-club2ruedas.appspot.com/o/images%2Fprofiles%2F13_10_2021_20_16_38_29_320x320.jpg?alt=media&token=b33bd262-f6bb-4278-ae89-988f57bf91c8"
    },
    showNotification: true
}

// create your reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case 'CHANGE_PROPERTY':
            return { ...state, tick: action.payload };
        case 'LOGOUT':
            debugger;
            return { state: null, tick: action.payload };
        default:
            return state;
    }
}

const persistedReducer = persistReducer({
    key: 'primary',
    storage,
    whitelist: ['user', 'token']
}, reducer)

// create a makeStore function
const makeStore = (initialState) => createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
)

export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState)
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
