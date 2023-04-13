import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const addAddress = createAsyncThunk(
  "createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.addAddress(formData);
      console.log(data, "addAddress");
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const getAddress = createAsyncThunk(
  "getAddress",
  async (creator, { rejectWithValue }) => {
    try {
      const response = await api.getAddress(creator);
      const data = await response?.data;
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

const initialState = { address: [] };

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    resetAddress: (state, action) => {
      state.address = action?.payload;
    },
    extraReducers: {
      [getAddress.pending]: (state) => {
        state.address = {};
      },
      [getAddress.fulfilled]: (state, action) => {
        state.address = action.payload;
      },
      [getAddress.rejected]: (state) => {
        state.address = {};
      },
      [addAddress.pending]: (state) => {
        state.address = null;
      },
      [addAddress.fulfilled]: (state, action) => {
        state.address = action?.payload;
        localStorage.setItem("address", JSON.stringify({ ...action?.payload }));
      },
      [addAddress.rejected]: (state) => {
        state.address = null;
      },
    },
  },
});

export const { resetAddress } = addressSlice.actions;

export default addressSlice.reducer;
