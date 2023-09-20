import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiArticleDetails from '../../Service/apiArticles/apiArticleDetails';

export const fetchArticleDetails = createAsyncThunk(
  'articles/fetchArticleDetails',
  apiArticleDetails,
);

const initialState = {
  article: [],
  status: true,
  error: null,
};

const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArticleDetails.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchArticleDetails.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.article = action.payload.article;
    },
    [fetchArticleDetails.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { loadArticleDetails } = articleDetailsSlice.actions;
export default articleDetailsSlice.reducer;
