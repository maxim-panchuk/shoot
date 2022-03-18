import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        username: "initial_username"
    },
    reducers: {
        defineUser(state, action) {
            state.username = action.payload;
        }
    }
});

export default userSlice.reducer;
export const {defineUser} = userSlice.actions;