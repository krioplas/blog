import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiLogin from '../../Service/apiUsers/apiLogin';
import apiUpdateUser from '../../Service/apiUsers/apiUpdateUser';

export const fetchLogin = createAsyncThunk('userLogin/fetchLogin', apiLogin);
export const fetchUpdateUser = createAsyncThunk(
  'userLogin/updateUser',
  apiUpdateUser,
);
const userData = localStorage.getItem('data');

const initialState = {
  user: userData ? JSON.parse(userData) : null,
  status: null,
  error: '',
};

const loginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    clearToken(state) {
      state.user = null;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = 'pending';
      state.user = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.user = action.payload;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      state.user = null;
    },
    [fetchUpdateUser.pending]: (state) => {
      state.status = 'loading';
      state.user = null;
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [fetchUpdateUser.rejected]: (state) => {
      state.status = 'rejected';
      state.user = null;
    },
  },
});
export const { loginF, clearToken } = loginSlice.actions;
export default loginSlice.reducer;
