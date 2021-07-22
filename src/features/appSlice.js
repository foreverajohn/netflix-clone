import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalMovie : {}
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    renderMovie: (state, action) => {
      state.modalMovie = action.payload;
    }
  }
});

export const { toggleModal, renderMovie } = appSlice.actions;

export const selectModalState = (state) => state.app.isModalOpen;

export const selectModalMovie = (state) => state.app.modalMovie;

export default appSlice.reducer;
