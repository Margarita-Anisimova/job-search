import { createSlice } from "@reduxjs/toolkit";

type userState_type = {
    user_id: number;
    user_type: string;
    fullemployer: boolean;
};

const initialState: { userState: userState_type } = {
    userState: {
        user_id: 0,
        user_type: 'noRegistered',
        fullemployer: false,
    },
};

export const counterSlice = createSlice({
    name: "userState",
    initialState: initialState,
    reducers: {
        changeUser: (state, action) => {
            state.userState = { user_id: action.payload.user_id, user_type: action.payload.user_type, fullemployer: action.payload.fullemployer };
        },
    },
});

export const {
    changeUser,
} = counterSlice.actions;

export default counterSlice.reducer;
