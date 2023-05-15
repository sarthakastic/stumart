// Native Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// API Imports
import * as api from '../api/index'

// Slice Imports
import { setError } from './errorSlice'

// used to add feedback
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

// initialise state
const initialState = { feedback: [] }

// state updation
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
