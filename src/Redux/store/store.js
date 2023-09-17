import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articlesSlice from '../reducers/articlesSlice';
import articleDetailsSlice from '../reducers/articleDetailsSlice';
import registerSlice from '../reducers/registerSlice';
import loginSlice from '../reducers/loginSlice';

const reducer = combineReducers({
  articlesSlice,
  articleDetailsSlice,
  registerSlice,
  loginSlice,
});

const store = configureStore({
  reducer,
});
export default store;
