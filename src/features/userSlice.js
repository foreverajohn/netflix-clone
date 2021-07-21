import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addSubscription: (state, action) => {
      state.user.subscription = action.payload;
    },
    cancelSubsctiption: (state) => {
      state.user.subscription = null;
    }
  }
});

export const { login, logout, addSubscription } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
