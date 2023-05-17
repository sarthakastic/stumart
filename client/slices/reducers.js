import { combineReducers } from '@reduxjs/toolkit'
import posts from './productSlice'
import auth from './authSlice'
import error from './errorSlice'
import load from './loaderSlice'

const combinedReducers = combineReducers({
  posts,
  auth,
  error,
  load,
})

const rootReducer = (state, action) => {
  return combinedReducers(state, action)
}

export default rootReducer
