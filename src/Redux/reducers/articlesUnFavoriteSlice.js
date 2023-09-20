import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import articlesUnFavorite from '../../Service/apiArticles/apiUnFavorite';

export const fetchArticlesUnFavorite = createAsyncThunk(
  'articlesFavoriteSlice/fetchArticlesFavorite',
  articlesUnFavorite,
);

const initialState = {
  error: null,
};

const articlesUnFavoriteSlice = createSlice({
  name: 'articlesFavoriteSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArticlesUnFavorite.pending]: (state) => {
      state.error = null;
    },
    [fetchArticlesUnFavorite.fulfilled]: (state) => {
      state.status = 'resolve';
    },
    [fetchArticlesUnFavorite.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { ArticlesUnFavorite } = articlesUnFavoriteSlice.actions;
export default articlesUnFavoriteSlice.reducer;
