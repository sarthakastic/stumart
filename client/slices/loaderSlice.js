// Native Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// used to set Load as true
export const setLoad = createAsyncThunk('setLoad', async (res) => {
  return res
})

// used to close load
export const closeLoad = createAsyncThunk('closeLoad', async (res) => {
  return res
})

// state initialisation
const initialState = { isLoad: false }

// state updation
export const LoadSlice = createSlice({
  name: 'load',
  initialState: initialState,
  reducers: {
    resetLoad: (state, action) => {
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setLoad.pending, (state) => {
        state.isLoad = false
      })
      .addCase(setLoad.fulfilled, (state, action) => {
        state.isLoad = true
      })
      .addCase(setLoad.rejected, (state) => {
        state.isLoad = false
      })
      .addCase(closeLoad.pending, (state) => {
        state.isLoad = true
      })
      .addCase(closeLoad.fulfilled, (state, action) => {
        state.isLoad = false
      })
      .addCase(closeLoad.rejected, (state) => {
        state.isLoad = true
      })
  },
})

export const { resetLoad } = LoadSlice.actions

export default LoadSlice.reducer
