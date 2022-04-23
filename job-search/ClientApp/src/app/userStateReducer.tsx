import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "../components/types";
import { createEmptyAccount } from "../exportFunctions";

const initialState: { userState: AccountType } = { userState: createEmptyAccount() };

export const counterSlice = createSlice({
    name: "userState",
    initialState: initialState,
    reducers: {
        changeUser: (state, action) => {
            state.userState = action.payload.userState;
        },
        changeUserProperty: (state, action) => {
            state.userState[action.payload.propertyName] = action.payload.property;
        }
    },
});

export const {
    changeUser, changeUserProperty
} = counterSlice.actions;

export default counterSlice.reducer;
