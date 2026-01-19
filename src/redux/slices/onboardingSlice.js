import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: '',            // 🆕 Step 1
  experience: '',
  stepOne: [],
  stepTwo: [],
  stepThree: '',
  stepFour: '',
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
     setRole(state, action) {
      state.role = action.payload;
    },
    setExperience(state, action) {
      state.experience = action.payload;
    },
    setStepOne(state, action) {
      state.stepOne = action.payload;
    },
    setStepTwo(state, action) {
      state.stepTwo = action.payload;
    },
    setStepThree(state, action) {
      state.stepThree = action.payload;
    },
    setStepFour(state, action) {
      state.stepFour = action.payload;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  setRole,
  setExperience,
  setStepOne,
  setStepTwo,
  setStepThree,
  setStepFour,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
