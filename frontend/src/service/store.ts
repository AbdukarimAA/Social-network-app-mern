import {configureStore, combineReducers} from "@reduxjs/toolkit";
import authReducer from './index';

const rootReducer = combineReducers({
    users: authReducer,
});

export const store =configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;