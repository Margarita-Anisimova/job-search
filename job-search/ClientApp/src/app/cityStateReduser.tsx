import { createSlice } from "@reduxjs/toolkit";

const initialState = { cityState: [] };

export const counterSlice = createSlice({
    name: "cityState",
    initialState: initialState,
    reducers: {
        changeCityList: (state, action) => {
            state.cityState = action.payload.cityState;
        },
    },
});

export const {
    changeCityList
} = counterSlice.actions;

export default counterSlice.reducer;
