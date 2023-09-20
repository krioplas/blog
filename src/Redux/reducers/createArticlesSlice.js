import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiCreateArticles from '../../Service/apiArticles/apiCreateArticle';

export const fetchCreateArticles = createAsyncThunk(
  'articles/fetchCreateArticles',
  apiCreateArticles,
);

const initialState = {
  status: null,
  error: null,
};

const createArticlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCreateArticles.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchCreateArticles.fulfilled]: (state) => {
      state.status = 'resolve';
    },
    [fetchCreateArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { createArticles } = createArticlesSlice.actions;
export default createArticlesSlice.reducer;
