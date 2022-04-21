import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "../components/types";
import { createEmptyAccount } from "../exportFunctions";

const initialState = { professionState: getPofession() }; // { professionState: [] };

async function getPofession() {
    let data = await fetch(`profession`)
        .then((response) => {
            return response.json()
        })
    return data
}

export const counterSlice = createSlice({
    name: "professionState",
    initialState: initialState,
    reducers: {
        changeProfessionList: (state, action) => {
            state.professionState = action.payload.professionState;
        },
    },
});

export const {
    changeProfessionList
} = counterSlice.actions;

export default counterSlice.reducer;
