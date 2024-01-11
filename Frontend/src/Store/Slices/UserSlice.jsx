import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  userName: "",
  mobile: "",
  email: "",
  image: "",
  is_Admin: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.mobile = action.payload.mobile;
      state.is_Admin = action.payload.is_Admin;
    },
    logoutDetails: (state, action) => {
      state.id = '';
      state.userName = '';
      state.email = '';
      state.image = '';
      state.mobile = '';
      state.is_Admin = '';
    }
  },
});

export const { setUserDetails , logoutDetails } = userSlice.actions;
export default userSlice.reducer;
