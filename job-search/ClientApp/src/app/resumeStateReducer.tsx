import { createSlice } from "@reduxjs/toolkit";
import { ResumeType } from "../components/types";
import { createEmptyEducation, createEmptyResume } from "../exportFunctions";

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
        },
        changeEdWorkProperty: (state, action) => {
            state.resumeState[action.payload.propName][action.payload.index].status = 'modify';
            state.resumeState[action.payload.propName][action.payload.index][action.payload.propertyName] = action.payload.property;
        },
        addSkill: (state, action) => {
            state.resumeState.resumeInfo.skills[action.payload.name] = action.payload.name
        },
        deleteSkill: (state, action) => {
            delete state.resumeState.resumeInfo.skills[action.payload.name]
        },
        addEdWork: (state, action) => {
            state.resumeState[action.payload.propName].push(createEmptyEducation(action.payload.resume_id));
        },
        deleteAllEdWork: (state, action) => {
            state.resumeState[action.payload.propName].forEach((e) => e.status = 'delete')
        },
    },
});

export const {
    changeResume, changeResumeProperty, changeEdWorkProperty, addEdWork, deleteAllEdWork, addSkill, deleteSkill
} = counterSlice.actions;

export default counterSlice.reducer;
