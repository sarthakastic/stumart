// Native Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// API Imports
import * as api from '../api/index'
import { closeLoad, setLoad } from './loaderSlice'

// used to add address
export const addAddress = createAsyncThunk(
  'createProduct',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoad())
      const data = await api.addAddress(formData)
      dispatch(closeLoad())
      return data
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

// used to get address
export const getAddress = createAsyncThunk(
  'getAddress',
  async (creator, { rejectWithValue }) => {
    try {
      const response = await api.getAddress(creator)
      const data = await response?.data
      return data
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

const initialState = { address: [] } // initial state

// state updation
const addressSlice = createSlice({
  name: 'address',
  initialState: initialState,
  reducers: {
    resetAddress: (state, action) => {
      state.address = action?.payload
    },
    extraReducers: {
      [getAddress.pending]: (state) => {
        state.address = {}
      },
      [getAddress.fulfilled]: (state, action) => {
        state.address = action.payload
      },
      [getAddress.rejected]: (state) => {
        state.address = {}
      },
      [addAddress.pending]: (state) => {
        state.address = null
      },
      [addAddress.fulfilled]: (state, action) => {
        state.address = action?.payload
        localStorage.setItem('address', JSON.stringify({ ...action?.payload }))
      },
      [addAddress.rejected]: (state) => {
        state.address = null
      },
    },
  },
})

export const { resetAddress } = addressSlice.actions

export default addressSlice.reducer
