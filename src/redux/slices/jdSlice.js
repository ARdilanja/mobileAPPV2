import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE from '../../config/api'
// change to your local IP for real device

// 🔹 Async thunk (API call)
export const extractSkillsFromJD = createAsyncThunk(
  'jd/extractSkills',
  async (jobDescription, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://192.168.0.4:3000/api/jobDesc/extract-skills`,
        { jobDescription }
      );
      console.log('response.data', response.data)

      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Job Description request failed'
      );
    }
  }
);

const jdSlice = createSlice({
  name: 'jobDesc',
  initialState: {
    jobRole: null,
    skills: [],
    experience: null,
    loading: false,
    error: null,
  },
   reducers: {
    clearJdData: (state) => {
      state.jobRole = null;
      state.skills = [];
      state.experience = null;
      state.error = null;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setJobRole: (state, action) => {
      state.jobRole = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(extractSkillsFromJD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extractSkillsFromJD.fulfilled, (state, action) => {
        state.loading = false;
        state.jobRole = action.payload.jobRole;
        state.skills = action.payload.skills;
        state.experience = action.payload.experience;
      })
      .addCase(extractSkillsFromJD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJdData, setSkills, setJobRole, setExperience } = jdSlice.actions;
export default jdSlice.reducer;
