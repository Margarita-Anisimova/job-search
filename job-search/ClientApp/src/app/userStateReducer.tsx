import { createSlice } from "@reduxjs/toolkit";

type userState_type = {
    user_id: number;
    user_type: string;
};

const initialState: { userState: userState_type } = {
    userState: {
        user_id: 0,
        user_type: 'noRegistered',
    },
};

export const counterSlice = createSlice({
    name: "userState",
    initialState: initialState,
    reducers: {
        changeUser: (state, action) => {
            state.userState = { user_id: action.payload.user_id, user_type: action.payload.user_type };
        },
    },
});

export const {
    changeUser,
} = counterSlice.actions;

export default counterSlice.reducer;
