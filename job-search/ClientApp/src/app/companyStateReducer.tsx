import { createSlice } from "@reduxjs/toolkit";
import { CompanyType } from "../components/types";
import { createEmptyCompany } from "../exportFunctions";

const initialState: { companyState: CompanyType } = { companyState: createEmptyCompany() };

export const counterSlice = createSlice({
    name: "companyState",
    initialState: initialState,
    reducers: {
        changeCompany: (state, action) => {
            state.companyState = action.payload.companyState;
        },
        changeCompanyInfo: (state, action) => {
            state.companyState.companyInfo[action.payload.name] = action.payload.value;
        },
        changeVacancy: (state, action) => {
            state.companyState.vacancies[action.payload.index] = action.payload.vacancy;
        },
        addVacancy: (state, action) => {
            state.companyState.vacancies.push(action.payload.vacancy);
        },
        deleteVacansy: (state, action) => {
            state.companyState.vacancies = state.companyState.vacancies.splice(action.payload.id, 1);
        },
    },
});

export const {
    changeCompany, changeCompanyInfo, changeVacancy, addVacancy, deleteVacansy
} = counterSlice.actions;

export default counterSlice.reducer;
