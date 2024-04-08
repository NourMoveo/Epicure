import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant } from "@/Model/Interfaces";
import { fetchRestaurantsPageData } from "../thunks/restaurantsPageThunk";

interface RestaurantsPageState {
  Restaurants: Restaurant[];
  page: number;
  limit: number;
  data: Restaurant[];
}

const initialState: RestaurantsPageState = {
  Restaurants: [],
  limit: 9,
  data: [],
  page: 1,
};

const restaurantsPageSlice = createSlice({
  name: "restaurantsPage",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Restaurant[]>) {
      state.data = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.Restaurants = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantsPageData.fulfilled, (state, action) => {
      state.Restaurants = action.payload.Restaurants;
    });
  },
});

export const { setRestaurantsData, setData, setLimit, setPage } = restaurantsPageSlice.actions;

export default restaurantsPageSlice.reducer;
