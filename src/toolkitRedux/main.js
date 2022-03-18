import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
    toolkit: toolkitSlice,
    userSlice: userSlice
});

const store = configureStore({
    reducer: rootReducer
});

export default store;