// src/redux/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { clearStorage, storeLocalValue } from '../helper/LocalStore';
import { LOCAL_STORE } from '../helper/Utils';
import messaging from '@react-native-firebase/messaging';

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
            messaging().deleteToken()
            clearStorage()
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
