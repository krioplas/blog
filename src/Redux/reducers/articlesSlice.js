import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticleList = createAsyncThunk(
  'articles/fetchArticleList',
  async (offset) => {
    const response = await fetch(
      `https://blog.kata.academy/api/articles?offset=${offset}&limit=5`,
    );
    const articlesList = await response.json();
    return articlesList;
  },
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
    [fetchArticleList.rejected]: () => {},
  },
});
export const { loadArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
