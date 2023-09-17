import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegister = createAsyncThunk(
  'users/fetchRegister',
  async (user) => {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    const register = await response.json();
    return register;
  },
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
      state.articles = action.payload.user;
    },
    [fetchRegister.rejected]: () => {},
  },
});
export const { registerF } = registerSlice.actions;
export default registerSlice.reducer;
