// Native Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// API Imports
import * as api from '../api/index'

// Slice Imports
import { setError } from './errorSlice'

// used to sign in
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

// used to sign up
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

// used to validate user on sign up
export const validateUser = createAsyncThunk(
  'validate',

  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.validateSighnUp(formData)
      console.log(response, 'inside slice')
      return response
    } catch (error) {
      console.log(error, 'inside catch')
      dispatch(setError(error?.response?.data?.message))
      rejectWithValue(error)
    }
  }
)

// user to check user exists or not on edit password
export const validateEditPassword = createAsyncThunk(
  'validate',

  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.validateUser(formData)
      console.log(response, 'inside slice')
      return response
    } catch (error) {
      console.log(error, 'inside catch')
      dispatch(setError(error?.response?.data?.message))
      rejectWithValue(error)
    }
  }
)

// used to get user info
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

// used to logout
export const logout = createAsyncThunk('logout', async () => {
  localStorage.clear()
  // Other logout logic here
})

// initial state
const initialState = {
  authData: null,
}

// satte updation
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
