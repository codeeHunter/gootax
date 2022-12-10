import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./slice/city";
import userSlice from "./slice/user";

export default configureStore({
  reducer: {
    user: userSlice,
    city: citySlice,
  },
});
