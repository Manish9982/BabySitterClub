// src/redux/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { clearStorage, storeLocalValue } from '../helper/LocalStore';
import { LOCAL_STORE } from '../helper/Utils';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state) => {
            storeLocalValue(LOCAL_STORE.LOGIN, 'true')
            state.isLoggedIn = true;
        },
        logout: (state) => {
            clearStorage()
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
