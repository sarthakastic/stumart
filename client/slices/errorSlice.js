import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setError = createAsyncThunk('setError', async (res) => {
  console.log(res, 'errorslice')
  return res
})

export const closeError = createAsyncThunk('closeError', async (res) => {
  const data = false
  return data
})

const initialState = { isError: false, error: '' }

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
        console.log(state?.error, 'bcvhjcjhbjkckdckjdfullfilled')
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
