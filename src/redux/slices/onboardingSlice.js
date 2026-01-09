import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepOne: [],
  stepTwo: [],
  stepThree: '',
  stepFour: '',
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
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
  setStepOne,
  setStepTwo,
  setStepThree,
  setStepFour,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
