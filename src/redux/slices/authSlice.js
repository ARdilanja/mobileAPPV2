import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/authApi";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Sending payload:", payload); // already have
      const res = await Api.post("/auth/register", payload);
      console.log("Success response:", res.data);
      return res.data;
    } catch (err) {
      console.log("Full error object:", err); // ← ADD THIS
      console.log("Error response:", err.response?.data); // ← ADD THIS
      console.log("Status code:", err.response?.status);

      return rejectWithValue(
        err.response?.data?.message || 
        err.message || 
        "Registration failed"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await Api.post("/auth/verify-otp", { email, otp });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    token: null,
    otp: null,
    error: null,
  },
  reducers: {
    clearAuthState: state => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.User;
        state.token = action.payload.token;
        state.otp = action.payload.referral_code;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
