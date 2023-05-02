import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setError } from './errorSlice'
import * as api from '../api/index'

export const signin = createAsyncThunk(
  'signin',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.signin(formData)
      return response?.data
    } catch (error) {
      console.log(error?.response?.data?.message, 'nbvxnshjx')
      dispatch(setError(error?.response?.data?.message))
      rejectWithValue(error)
    }
  }
)

export const signup = createAsyncThunk(
  'signup',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.signup(formData)
      return response?.data
    } catch (error) {
      console.log(error?.response?.data?.message, 'nbvxnshjx')
      dispatch(setError(error?.response?.data?.message))
      rejectWithValue(error)
    }
  }
)

export const getUserInfo = createAsyncThunk(
  'userInfo',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.getUserInfo(id)
      return response?.data
    } catch (error) {
      console.log(error?.response?.data?.message, 'nbvxnshjx')
      dispatch(setError(error?.response?.data?.message))
      rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('logout', async () => {
  localStorage.clear()
  // Other logout logic here
})

const initialState = {
  authData: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetAuth: (state, action) => {
      state.authData = action?.payload
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.authData = null
    },
    [signin.fulfilled]: (state, action) => {
      state.authData = action?.payload
      console.log(state.authData, 'payload signin')
      state?.authData &&
        localStorage.setItem(
          'profile',
          JSON.stringify({
            ...action?.payload,
            expirationTime: new Date().getTime() + 90 * 24 * 60 * 60 * 1000,
          })
        )
    },
    [signin.rejected]: (state) => {
      state.authData = null
    },
    [signup.pending]: (state) => {
      state.authData = null
    },
    [signup.fulfilled]: (state, action) => {
      state.authData = action?.payload
      console.log(state.authData, 'payload sognup')
      state?.authData &&
        localStorage.setItem(
          'profile',
          JSON.stringify({
            ...action?.payload,
            expirationTime: new Date().getTime() + 90 * 24 * 60 * 60 * 1000,
          })
        )
    },
    [signup.rejected]: (state) => {
      state.authData = null
    },
    [logout.pending]: (state) => {
      state.authData = state
    },
    [logout.fulfilled]: (state) => {
      state.authData = null
    },
    [logout.rejected]: (state) => {
      state.authData = state
    },
  },
})

export const { resetAuth } = authSlice.actions

export default authSlice.reducer
