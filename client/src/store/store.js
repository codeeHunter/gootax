import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
