import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.fetchProducts(page);
      const data = await response?.data;
      console.log(data, "data");
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const createProducts = createAsyncThunk(
  "createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.createProduct(formData);
      console.log(data, "createProduct");
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

const initialState = { posts: [], numberOfPages: null };

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    resetProducts: (state, action) => {
      state.posts = action?.payload?.data;
      state.numberOfPages = action?.payload?.numberOfPages;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.posts = [];
      state.numberOfPages = 0;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.posts = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
    },
    [fetchProducts.rejected]: (state) => {
      state.posts = [];
      state.numberOfPages = 0;
    },

    [createProducts.pending]: (state) => {
      state.posts = [];
    },
    [createProducts.fulfilled]: (state, action) => {
      state.posts = [...state.posts, action.payload.data];
    },
    [createProducts.rejected]: (state) => {
      state.posts = [];
    },
  },
});

export const { resetProducts } = postsSlice.actions;

export default postsSlice.reducer;
