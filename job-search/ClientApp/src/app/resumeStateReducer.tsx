import { createSlice } from "@reduxjs/toolkit";
import { ResumeType } from "../components/types";
import { createEmptyResume } from "../exportFunctions";

const initialState: { resumeState: ResumeType } = { resumeState: createEmptyResume() };

export const counterSlice = createSlice({
    name: "resumeState",
    initialState: initialState,
    reducers: {
        changeResume: (state, action) => {
            state.resumeState = action.payload.resumeState;
        },
        changeResumeProperty: (state, action) => {
            state.resumeState.resumeInfo[action.payload.propertyName] = action.payload.property;
        }
    },
});

export const {
    changeResume, changeResumeProperty
} = counterSlice.actions;

export default counterSlice.reducer;
