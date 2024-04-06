import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant } from "@/Model/Interfaces";
import { fetchRestaurantsPageData } from "../thunks/restaurantsPageThunk";

interface RestaurantsPageState {
  Restaurants: Restaurant[];
  page: number;
  limit: number;
  data: Restaurant[];

  allRestaurants: Restaurant[];
  newRestaurants: Restaurant[];
  popularRestaurants: Restaurant[];
  openNowRestaurants: Restaurant[];
  restaurantByPrices: Restaurant[];
  selectedRestaurant: Restaurant | null;
  newData: Restaurant[];
  distance: number;
  selectedRating: number[];
  firstFilter: string;
  secondFilter: string;
  restaurantsByPriceRange: Restaurant[];
  restaurantsByDistance: Restaurant[];
  restaurantsByRatings: Restaurant[];
}

const initialState: RestaurantsPageState = {
  Restaurants: [],
  page: 1,
  limit: 9,
  data: [],

  allRestaurants: [],
  newRestaurants: [],
  popularRestaurants: [],
  openNowRestaurants: [],
  selectedRestaurant: null,
  restaurantByPrices: [],
  firstFilter: "All",
  distance: 3.4,
  selectedRating: [1, 2, 3, 4, 5],
  newData: [],
  secondFilter: "",
  restaurantsByPriceRange: [],
  restaurantsByDistance: [],
  restaurantsByRatings: [],
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
    setAllRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.allRestaurants = action.payload;
    },
    setNewRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.newRestaurants.concat(action.payload);
    },
    setPopularRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.popularRestaurants = action.payload;
    },
    setOpenNowRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.openNowRestaurants = action.payload;
    },
    openRestaurantDetail(state, action: PayloadAction<Restaurant>) {
      state.selectedRestaurant = action.payload;
    },
    setRestaurantByPrices(state, action: PayloadAction<Restaurant[]>) {
      state.restaurantByPrices = action.payload;
    },
    setNewData(state, action: PayloadAction<Restaurant[]>) {
      state.newData = action.payload;
    },
    setDistance(state, action: PayloadAction<number>) {
      state.distance = action.payload;
    },
    setSelectedRating(state, action: PayloadAction<number[]>) {
      state.selectedRating = action.payload;
    },
    setFirstFilter(state, action: PayloadAction<string>) {
      state.firstFilter = action.payload;
    },
    setSecondFilter(state, action: PayloadAction<string>) {
      state.secondFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantsPageData.fulfilled, (state, action) => {
      state.Restaurants = action.payload.Restaurants;
      // state.restaurantsPrices = action.payload.restaurantsPrices;
      // state.restaurantsDistances = action.payload.restaurantsDistances;
      // state.allRestaurants = action.payload.allRestaurants;
      // state.newRestaurants = action.payload.newRestaurants;
      // state.popularRestaurants = action.payload.popularRestaurants;
      // state.openNowRestaurants = action.payload.openNowRestaurants;
      // state.restaurantByPrices = action.payload.restaurantsByPriceRange;
      // state.restaurantsByDistance = action.payload.restaurantsByDistance;
      // state.restaurantsByRatings = action.payload.restaurantsByRatings;
    });
  },
});

export const {
  setRestaurantsData,
  setData,

  setFirstFilter,
  setSecondFilter,
  setSelectedRating,
  setDistance,
  setNewData,
  setLimit,
  setPage,
  setAllRestaurantsData,
  setNewRestaurantsData,
  setPopularRestaurantsData,
  setOpenNowRestaurantsData,
  openRestaurantDetail,
  setRestaurantByPrices,
} = restaurantsPageSlice.actions;

export default restaurantsPageSlice.reducer;
