import { configureStore } from "@reduxjs/toolkit";
import interviewReducer from "./interviewSlice";
import authReducer from "./slices/authSlice";
import JobDescReducer from "./slices/jdSlice";
import onboardingReducer from './slices/onboardingSlice';

export const store = configureStore({
    reducer: {
        interview: interviewReducer,
        auth: authReducer,
         jobDesc: JobDescReducer,
        onboarding: onboardingReducer,
    },
});
