// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import globalReducer from './GlobalSlice'

const Store = configureStore({
    reducer: {
        auth: authReducer,
        global: globalReducer
    },
});

export default Store;
