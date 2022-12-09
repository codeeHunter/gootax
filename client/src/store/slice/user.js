import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../http";

export const fetchUserRegistration = createAsyncThunk(
  "user/fetchUserRegistration",
  async (payload) => {
    const { fullName, password, phoneNumber, email } = payload;
    const response = await AuthService.registration(
      fullName,
      email,
      phoneNumber,
      password
    );

    return response.data;
  }
);

export const fetchUserAuthorization = createAsyncThunk(
  "user/fetchUserAuthorization",
  async (payload) => {
    const { email, password } = payload;
    const response = await AuthService.login(email, password);

    return response.data;
  }
);

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  const response = await axios.get(`${API_URL}/refresh`, {
    withCredentials: true,
  });

  return response.data;
});

const initialState = {
  userInfo: {},
  status: false,
  statusAuth: false,
  errors: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.email = action.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRegistration.pending, (state) => {
      state.status = true;
    });

    builder.addCase(fetchUserRegistration.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
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
      localStorage.setItem("token", action.payload.accessToken);
      state.userInfo = action.payload.user;
      state.statusAuth = true;
      state.status = false;
    });

    builder.addCase(fetchUserAuthorization.rejected, (state, action) => {
      state.statusAuth = false;
      state.status = false;
      state.errors.push(action.error);
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.userInfo = action.payload.user;
      state.statusAuth = true;
    });
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
