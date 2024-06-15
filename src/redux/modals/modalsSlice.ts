import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signInModal: false,
  uploadingPost: false,
  editProfile: false,
};

const modalsSlice = createSlice({
  initialState,
  name: "modals",
  reducers: {
    setSignInModal: (state, action) => {
      state.signInModal = action.payload.open;
    },
    setUploadingPost: (state, action) => {
      state.uploadingPost = action.payload.open;
    },
    setEditProfile: (state, action) => {
      state.editProfile = action.payload.open;
    },
  },
});

export const { setSignInModal, setUploadingPost, setEditProfile } =
  modalsSlice.actions;

export default modalsSlice.reducer;
