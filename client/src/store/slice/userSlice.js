import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userAuth: false,
    fio: "",
    phone: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { email, fio, phone } = action.payload;
      state.email = email;
      state.fio = fio;
      state.phone = phone;
      state.userAuth = true;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
