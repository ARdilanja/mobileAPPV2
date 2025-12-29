import { configureStore } from "@reduxjs/toolkit";
import interviewReducer from "./interviewSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        interview: interviewReducer,
        auth: authReducer,
    },
});
