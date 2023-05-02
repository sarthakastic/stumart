import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/index'
import { setError } from './errorSlice'

export const addFeedback = createAsyncThunk(
  'addFeedback',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const data = await api
        .addFeedback(formData)
        .then(() => dispatch(setError('FeedBack Submitted.')))

      return data
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

const initialState = { feedback: [] }

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: initialState,
  reducers: {
    resetAddress: (state, action) => {
      state.feedback = action?.payload
    },
    extraReducers: {
      [addFeedback.pending]: (state) => {
        state.address = {}
      },
      [addFeedback.fulfilled]: (state, action) => {
        state.address = action.payload
      },
      [addFeedback.rejected]: (state) => {
        state.address = {}
      },
    },
  },
})

export const { resetFeedback } = feedbackSlice.actions

export default feedbackSlice.reducer
