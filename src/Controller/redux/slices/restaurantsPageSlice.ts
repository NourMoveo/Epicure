import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant } from "@/Model/Interfaces";
import { fetchRestaurantsPageData } from "../thunks/restaurantsPageThunk";

interface RestaurantsPageState {
  allRestaurants: Restaurant[];
  newRestaurants: Restaurant[];
  popularRestaurants: Restaurant[];
  openNowRestaurants: Restaurant[];
  restaurantByPrices: Restaurant[];
  restaurantsPrices: number[];
  selectedRestaurant: Restaurant | null;
  page: number;
  limit: number;
  data: Restaurant[];
  newData: Restaurant[];
  min: number;
  max: number;
  restaurantsDistances: number[];
  distance: number;
  selectedRating: number[];
  firstFilter: string;
  secondFilter:string;
}

const initialState: RestaurantsPageState = {
  allRestaurants: [],
  newRestaurants: [],
  popularRestaurants: [],
  openNowRestaurants: [],
  restaurantsPrices: [],
  selectedRestaurant: null,
  restaurantByPrices: [],
  firstFilter:"All",
  page: 1,
  limit: 3,
  data: [],
  min: 0,
  max: 0,
  restaurantsDistances: [],
  distance: 0,
  selectedRating: [],
  newData:[],
  
  secondFilter:""
};

const restaurantsPageSlice = createSlice({
  name: "restaurantsPage",
  initialState,
  reducers: {
    setAllRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.allRestaurants = action.payload;
      
    },
    setNewRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.newRestaurants = action.payload;
      
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
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload + 1;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setRestaurantsPrices(state, action: PayloadAction<number[]>) {
      state.restaurantsPrices = action.payload;
    },
    setRestaurantByPrices(state, action: PayloadAction<Restaurant[]>) {
      state.restaurantByPrices = action.payload;
      
    },
    setData(state, action: PayloadAction<Restaurant[]>) {
      if (state.data.length > 0) {
        state.data.concat(action.payload);
      }
      state.data = action.payload;
    },setNewData(state, action: PayloadAction<Restaurant[]>) {
      state.newData = action.payload;
    },
    setMin(state, action: PayloadAction<number>) {
      state.min = action.payload;
    },
    setMax(state, action: PayloadAction<number>) {
      state.max = action.payload;
    },
    setRestaurantsDistances(state, action: PayloadAction<number[]>) {
      state.restaurantsDistances = action.payload;
    },
    setDistance(state, action: PayloadAction<number>) {
      state.distance = action.payload;
    },
    setSelectedRating(state, action: PayloadAction<number[]>) {
      state.selectedRating = action.payload;
    },
    setFirstFilter(state, action: PayloadAction<string>) {
      state.firstFilter = action.payload;
      console.log(" action.payload;  action.payload;  action.payload;  action.payload;", action.payload)
    },
    setSecondFilter(state, action: PayloadAction<string>) {
      state.secondFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantsPageData.fulfilled, (state, action) => {
      state.allRestaurants = action.payload.allRestaurants;
      state.newRestaurants = action.payload.newRestaurants;
      state.popularRestaurants = action.payload.popularRestaurants;
      state.openNowRestaurants = action.payload.openNowRestaurants;
      state.restaurantsPrices= action.payload.restaurantsPrices;
      state.restaurantsDistances=action.payload.restaurantsDistances;
    });
  },
});

export const {
  setFirstFilter,
  setSecondFilter,
  setSelectedRating,
  setDistance,
  setData,
  setLimit,
  setPage,
  setAllRestaurantsData,
  setNewRestaurantsData,
  setPopularRestaurantsData,
  setOpenNowRestaurantsData,
  openRestaurantDetail,
  setRestaurantByPrices,
  setMax,
  setMin,
} = restaurantsPageSlice.actions;

export default restaurantsPageSlice.reducer;
