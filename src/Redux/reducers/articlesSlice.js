import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import fetchArticles from '../../Service/apiArticles/apiArticles';

export const fetchArticleList = createAsyncThunk(
  'articles/fetchArticleList',
  fetchArticles,
);

const initialState = {
  articles: [],
  status: null,
  error: null,
  articlesCount: 0,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArticleList.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchArticleList.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchArticleList.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { loadArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
