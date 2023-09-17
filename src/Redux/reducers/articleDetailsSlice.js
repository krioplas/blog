import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticleDetails = createAsyncThunk(
  'articles/fetchArticleDetails',
  async (slug) => {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
    );
    const articleDetails = await response.json();
    return articleDetails;
  },
);

const initialState = {
  article: [],
  load: true,
  errorOne: null,
};

const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArticleDetails.pending]: (state) => {
      state.load = true;
      state.error = null;
    },
    [fetchArticleDetails.fulfilled]: (state, action) => {
      state.load = false;
      state.article = action.payload.article;
    },
    [fetchArticleDetails.rejected]: () => {},
  },
});

export const { loadArticleDetails } = articleDetailsSlice.actions;
export default articleDetailsSlice.reducer;
