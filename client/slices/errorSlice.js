// Native Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// used to set Error
export const setError = createAsyncThunk('setError', async (res) => {
  console.log(res, 'errorslice')
  return res
})

// used to close error
export const closeError = createAsyncThunk('closeError', async (res) => {
  const data = false
  return data
})

// state initialisation
const initialState = { isError: false, error: '' }

// state updation
export const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    resetError: (state, action) => {
      state.error = action.payload
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setError.pending, (state) => {
        state.error = ''
      })
      .addCase(setError.fulfilled, (state, action) => {
        state.error = action.payload
        state.isError = true
      })
      .addCase(setError.rejected, (state) => {
        state.error = ''
      })
      .addCase(closeError.pending, (state) => {
        state.isError = true
      })
      .addCase(closeError.fulfilled, (state, action) => {
        state.isError = action.payload
      })
      .addCase(closeError.rejected, (state) => {
        state.isError = true
      })
  },
})

export const { resetError } = errorSlice.actions

export default errorSlice.reducer
