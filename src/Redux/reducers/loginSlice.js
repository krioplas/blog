import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLogin = createAsyncThunk(
  'userLogin/fetchLogin',
  async (user) => {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });

    const login = await response.json();
    if (login) {
      localStorage.setItem('currentUser', JSON.stringify(login.user.token));
    }
    return login;
  },
);

const initialState = {
  user: {},
  status: null,
  error: null,
  token: null,
};

const loginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    clearToken: (state, active) => ({
      ...state,
      token: active.payload,
    }),
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchLogin.fulfilled]: (state) => {
      state.status = 'resolve';
    },
    [fetchLogin.rejected]: () => {},
  },
});
export const { loginF } = loginSlice.actions;
export default loginSlice.reducer;
