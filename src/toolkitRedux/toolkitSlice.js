import { createSlice } from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkitSlice",
    initialState: {
        x: 0,
        y: 0,
        radius: 1,
        dots: []
    },
    reducers: {
        changeRadius(state, action) {
            state.radius = action.payload;
        },
        pushDot(state, action) {
            state.dots.push(action.payload);
        },
        defineDots(state, action) {
            state.dots = action.payload
        },
        changeX(state, action) {
            state.x = action.payload;
        },
        changeY(state, action) {
            state.y = action.payload;
        }
    }
});

export default toolkitSlice.reducer;
export const { changeRadius, pushDot, changeX, changeY, defineDots } = toolkitSlice.actions