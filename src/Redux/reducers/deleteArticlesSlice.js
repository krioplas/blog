import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiDeleteArticle from '../../Service/apiArticles/apiDeleteArticle ';

export const fetchDeleteArticles = createAsyncThunk(
  'articles/fetchDeleteArticles',
  apiDeleteArticle,
);

const initialState = {
  status: null,
  error: null,
};

const deleteArticlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDeleteArticles.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchDeleteArticles.fulfilled]: (state) => {
      state.status = 'resolve';
    },
    [fetchDeleteArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { deleteArticles } = deleteArticlesSlice.actions;
export default deleteArticlesSlice.reducer;
