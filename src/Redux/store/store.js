import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articlesSlice from '../reducers/articlesSlice';
import articleDetailsSlice from '../reducers/articleDetailsSlice';
import registerSlice from '../reducers/registerSlice';
import loginSlice from '../reducers/loginSlice';
import articlesFavoriteSlice from '../reducers/articlesFavoriteSlice';
import articlesUnFavoriteSlice from '../reducers/articlesUnFavoriteSlice';
import articleEditSlice from '../reducers/articleEditSlice';

const reducer = combineReducers({
  articlesSlice,
  articleDetailsSlice,
  registerSlice,
  loginSlice,
  articlesFavoriteSlice,
  articlesUnFavoriteSlice,
  articleEditSlice,
});

const store = configureStore({
  reducer,
});
export default store;
