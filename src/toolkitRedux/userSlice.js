import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        username: "initial_username",
        auth: ""
    },
    reducers: {
        defineUser(state, action) {
            state.username = action.payload;
        },
        defineAuth(state, action) {
            state.auth = action.payload;
        }
    }
});

export default userSlice.reducer;
export const {defineUser, defineAuth} = userSlice.actions;