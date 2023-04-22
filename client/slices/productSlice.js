import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/index'

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.fetchProducts(page)
      const data = await response?.data
      console.log(data, 'data')
      return data
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

export const createProducts = createAsyncThunk(
  'createProduct',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.createProduct(formData)
      return data
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

export const pagination = createAsyncThunk(
  'pagination',
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData, 'formData')
      return formData
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

export const searchProducts = createAsyncThunk(
  'search',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.searchProducts(searchQuery)
      const data = await response?.data
      return data
    } catch (error) {
      return rejectWithValue(error.data)
    }
  }
)

export const getProduct = createAsyncThunk(
  'fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProduct(id)
      const data = await response?.data
      console.log(data, 'data')
      return data
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

export const getUserProduct = createAsyncThunk(
  'fetchUserProduct',
  async (creator, { rejectWithValue }) => {
    try {
      console.log(creator, 'slice')
      const response = await api.getUserProduct(creator)

      const data = await response?.data
      console.log(data, 'data')
      return data
    } catch (error) {
      return rejectWithValue(error?.data)
    }
  }
)

const initialState = { posts: [], numberOfPages: null, currentPage: 1 }

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    resetProducts: (state, action) => {
      state.posts = action?.payload?.data
      state.numberOfPages = action?.payload?.numberOfPages
      state.currentPage = action?.payload?.currentPage
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.posts = []
      state.numberOfPages = 0
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.posts = action.payload.data
      state.numberOfPages = action.payload.numberOfPages
      state.currentPage = action?.payload?.currentPage
    },
    [fetchProducts.rejected]: (state) => {
      state.posts = []
      state.numberOfPages = 0
    },

    [createProducts.pending]: (state) => {
      state.posts = []
    },
    [createProducts.fulfilled]: (state, action) => {
      state.posts = [...state.posts, action.payload.data]
    },
    [createProducts.rejected]: (state) => {
      state.posts = []
    },
    [pagination.pending]: (state) => {
      state.currentPage = 1
    },
    [pagination.fulfilled]: (state, action) => {
      state.currentPage = action.payload
    },
    [pagination.rejected]: (state) => {
      state.currentPage = 1
    },
    [searchProducts.pending]: (state) => {
      state.posts = []
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.posts = action.payload.data
    },
    [searchProducts.rejected]: (state) => {
      state.posts = []
    },
    [getUserProduct.pending]: (state) => {
      state.posts = []
      state.numberOfPages = 0
    },
    [getUserProduct.fulfilled]: (state, action) => {
      state.posts = action.payload
      console.log(state.posts, 'state.posts')
    },
    [getUserProduct.rejected]: (state) => {
      state.posts = []
      state.numberOfPages = 0
    },
  },
})

export const { resetProducts } = postsSlice.actions

export default postsSlice.reducer
