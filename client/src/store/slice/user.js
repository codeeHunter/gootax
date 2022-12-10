import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import $api, { API_URL } from "../../http";

export const fetchUserRegistration = createAsyncThunk(
  "user/fetchUserRegistration",
  async (payload) => {
    const { fullName, password, phone, email } = payload;
    const response = await AuthService.registration(
      fullName,
      email,
      phone,
      password
    );
    return response.data;
  }
);

export const fetchUserAuthorization = createAsyncThunk(
  "user/fetchUserAuthorization",
  async (payload) => {
    try {
      const { email, password } = payload;
      const response = await AuthService.login(email, password);

      return response.data;
    } catch (e) {
      if (!e.response.data) console.log(e);

      return isRejectedWithValue(e.response.data.payload);
    }
  }
);

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  const response = await $api.get(`${API_URL}/refresh`);

  return response.data;
});

const initialState = {
  userInfo: {},
  status: false,
  statusAuth: false,
  choiceCity: false,
  errors: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchUserRegistration.pending, (state) => {
      state.status = true;
    });

    builder.addCase(fetchUserRegistration.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
      state.statusAuth = true;
      state.status = false;
    });

    builder.addCase(fetchUserRegistration.rejected, (state, action) => {
      state.errors.push(action.error.stack);
      state.status = false;
      state.statusAuth = false;
    });

    builder.addCase(fetchUserAuthorization.pending, (state) => {
      state.statusAuth = false;
      state.status = true;
    });

    builder.addCase(fetchUserAuthorization.fulfilled, (state, action) => {
      console.log(action);
      // localStorage.setItem("token", action.payload.data.accessToken);
      // state.userInfo = action.payload.data.user;
      state.statusAuth = true;
      state.status = false;
    });

    builder.addCase(fetchUserAuthorization.rejected, (state, action) => {
      state.statusAuth = false;
      state.status = false;
      console.log(action);
      state.errors.push(action.error);
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.choiceCity = true;
      state.userInfo = action.payload.user;
      state.statusAuth = true;
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      if (state.userInfo) {
        state.statusAuth = true;
      } else {
        state.choiceCity = false;
        state.statusAuth = false;
      }
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
