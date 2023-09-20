import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiEditArticle from '../../Service/apiArticles/apiEditArticle';

export const fetchEditArticle = createAsyncThunk(
  'article/fetchEditArticle',
  apiEditArticle,
);

const initialState = {
  status: true,
  error: null,
};

const editArticleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEditArticle.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchEditArticle.fulfilled]: (state) => {
      state.status = 'resolve';
    },
    [fetchEditArticle.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { EditArticle } = editArticleSlice.actions;
export default editArticleSlice.reducer;
