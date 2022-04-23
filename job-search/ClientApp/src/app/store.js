import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import userStateReducer from "./userStateReducer";
import resumeStateReducer from "./resumeStateReducer";
import companyStateReducer from "./companyStateReducer";
import professionStateReducer from "./professionStateReducer";
import { getCookie } from "../components/cookies";



const appReducer = combineReducers({
    resumeState: resumeStateReducer,
    userState: userStateReducer,
    professionState: professionStateReducer,
    companyState: companyStateReducer,
});

const reducers = (state, action) => {
    let a = getCookie('user_id')
    //|| !state.userState.userState.user_id
    // && (!getCookie('user_id'))
    // if (action.type.includes("INIT")) {
    //     storage.removeItem("persist:root");
    //     state = undefined;
    // }
    state.professionState = undefined;
    if (action.type.includes("PERSIST") && (!getCookie('user_id') || getCookie('user_id') !== state.userState.userState.user_id)) {
        console.log(getCookie('user_id'))
        console.log(state.userState.userState.user_id)
        storage.removeItem("persist:root");
        state = undefined;
    }
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