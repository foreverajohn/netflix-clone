import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  subscription: null,
  movieList: []
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
    addSubscription: (state, action) => ({
      ...state,
      subscription: action.payload
    }),
    cancelSubsctiption: (state) => {
      state.user.subscription = null;
    },
    loadMovieList: (state, action) => ({
      ...state,
      movieList: action.payload
    }),
    addToMovieList: (state, action) => ({
      ...state,
      movieList: [...state.movieList, action.payload]
    }),
    deleteFromMovieList: (state, action) => ({
      ...state,
      movieList: state.movieList.filter(movie => action.payload !== movie)
    })
  }
});

export const { login, logout, addSubscription, loadMovieList, addToMovieList, deleteFromMovieList } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectSubscription = (state) => state.user.subscription;

export const selectMovieList = (state) => state.user.movieList;

export default userSlice.reducer;
