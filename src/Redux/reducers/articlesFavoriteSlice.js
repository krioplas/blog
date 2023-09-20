import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import articlesFavorite from '../../Service/apiArticles/apiFavorite';

export const fetchArticlesFavorite = createAsyncThunk(
  'articlesFavoriteSlice/fetchArticlesFavorite',
  articlesFavorite,
);

const initialState = {
  error: null,
};

const articlesFavoriteSlice = createSlice({
  name: 'articlesFavoriteSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArticlesFavorite.pending]: (state) => {
      state.error = null;
    },
    [fetchArticlesFavorite.fulfilled]: (state) => {
      state.status = 'resolve';
    },
    [fetchArticlesFavorite.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { ArticlesFavorite } = articlesFavoriteSlice.actions;
export default articlesFavoriteSlice.reducer;
