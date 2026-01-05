import { configureStore } from "@reduxjs/toolkit";
import interviewReducer from "./interviewSlice";
import authReducer from "./slices/authSlice";
import JobDescReducer from "./slices/jdSlice";

export const store = configureStore({
    reducer: {
        interview: interviewReducer,
        auth: authReducer,
        jobDesc: JobDescReducer,
    },
});
