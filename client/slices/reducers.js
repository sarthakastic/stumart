import { combineReducers } from '@reduxjs/toolkit'
import posts from './productSlice'
import auth from './authSlice'
import error from './errorSlice'

const combinedReducers = combineReducers({
  posts,
  auth,
  error,
})

const rootReducer = (state, action) => {
  return combinedReducers(state, action)
}

export default rootReducer
