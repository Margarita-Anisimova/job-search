import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import userStateReducer from "./userStateReducer.tsx";


const appReducer = combineReducers({
    userState: userStateReducer,
});

const reducers = (state, action) => {
    // if (action.type.includes("INIT")) {
    //     storage.removeItem("professionsList");
    //     // state = undefined;
    // }
    return appReducer(state, action);
};

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export default store;