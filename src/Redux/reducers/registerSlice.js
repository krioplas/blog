import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiRegister from '../../Service/apiUsers/apiRegistration';

export const fetchRegister = createAsyncThunk(
  'users/fetchRegister',
  apiRegister,
);

const initialState = {
  user: {},
  status: null,
  error: null,
};

const registerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.user = action.payload.user;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { registerF } = registerSlice.actions;
export default registerSlice.reducer;
