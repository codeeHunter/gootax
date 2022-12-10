import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../http";
import CityService from "../../services/CityService";
import ReviewsService from "../../services/ReviewsService";

export const fetchCities = createAsyncThunk("city/fetchCities", async () => {
  const response = await CityService.getCities();

  return response.data;
});

export const createCity = createAsyncThunk(
  "city/createCity",
  async (payload) => {
    const response = await CityService.createCity(payload);

    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "city/getReviews",
  async (payload) => {
    const response = await ReviewsService.getReviews(payload);
    console.log(response.data)
    return response.data;
  }
);

const initialState = {
  cityInfo: [],
  reviewsInfo: [],
  status: false,
  errors: [],
};

export const citySlice = createSlice({
  name: "city",
  initialState,

  extraReducers: (builder) => {
    // Все города
    builder.addCase(fetchCities.pending, (state) => {
      state.status = false;
    });

    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cityInfo = action.payload;
      state.status = true;
    });

    builder.addCase(fetchCities.rejected, (state, action) => {
      state.errors = action.error;
      state.status = false;
    });

    // Создание города
    builder.addCase(createCity.pending, (state) => {
      state.status = false;
    });

    builder.addCase(createCity.fulfilled, (state, action) => {
      state.cityInfo = action.payload;
      state.status = true;
    });

    builder.addCase(createCity.rejected, (state, action) => {
      state.errors = action.error;
      state.status = false;
    });

    // Вывод reviews по id
    builder.addCase(getReviews.pending, (state) => {
      state.status = false;
    });

    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.reviewsInfo = action.payload;
      state.status = true;
    });

    builder.addCase(getReviews.rejected, (state, action) => {
      state.errors = action.error;
      state.status = false;
    });
  },
});

export const { getUser } = citySlice.actions;

export default citySlice.reducer;
