import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const signin = createAsyncThunk(
  "signin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.signin(formData);
      console.log(response, "auth");
      return response?.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.signup(formData);
      return response?.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("logout", async () => {
  localStorage.clear();
  // Other logout logic here
});

const initialState = {
  authData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAuth: (state, action) => {
      state.authData = action?.payload;
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.authData = null;
    },
    [signin.fulfilled]: (state, action) => {
      state.authData = action?.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
    },
    [signin.rejected]: (state) => {
      state.authData = null;
    },
    [signup.pending]: (state) => {
      state.authData = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.authData = action?.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
    },
    [signup.rejected]: (state) => {
      state.authData = null;
    },
    [logout.pending]: (state) => {
      state.authData = state;
    },
    [logout.fulfilled]: (state) => {
      state.authData = null;
    },
    [logout.rejected]: (state) => {
      state.authData = state;
    },
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
