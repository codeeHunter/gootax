import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CityService from "../../services/CityService";
import ReviewsService from "../../services/ReviewsService";

export const fetchCities = createAsyncThunk("city/fetchCities", async () => {
  const response = await CityService.getCities();

  return response.data;
});

export const createCity = createAsyncThunk(
  "city/createCity",
  async (payload) => {
    console.log(payload);
    const response = await CityService.createCity(payload);

    return response.data;
  }
);

export const createReviews = createAsyncThunk(
  "city, createReviews",
  async (payload) => {
    const { selectedImage, nameReview, review, rating, city } = payload;
    const response = await ReviewsService.createReviews(
      selectedImage,
      nameReview,
      review,
      rating,
      city
    );

    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "city/getReviews",
  async (payload) => {
    const response = await ReviewsService.getReviews(payload);
    return response.data;
  }
);

export const editReviews = createAsyncThunk(
  "city/editReviews",
  async (payload) => {
    const { _id, name, text, img, reviewRating } = payload;
    console.log(_id, name, text, img, reviewRating);
    const response = await ReviewsService.editReviews(
      _id,
      name,
      text,
      img,
      reviewRating
    );

    return response.data;
  }
);

const initialState = {
  cityInfo: [],
  reviewsInfo: [],
  status: false,
  check: localStorage.getItem("checkChoice"),
  errors: [],
  isCreate: false,
  reviews: [],
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
      state.cityInfo.push(action.payload);
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
      localStorage.setItem("checkChoice", "true");
      state.status = true;
    });

    builder.addCase(getReviews.rejected, (state, action) => {
      state.errors = action.error;
      state.status = false;
    });

    builder.addCase(createReviews.fulfilled, (state) => {
      state.isCreate = true;
    });

    builder.addCase(editReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
  },
});

export const { getUser } = citySlice.actions;

export default citySlice.reducer;
