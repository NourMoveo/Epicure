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
  restaurantsDistances: number[];
  distance: number;
  selectedRating: number[];
  firstFilter: string;
  secondFilter:string;
  min: number;
  max: number;
  restaurantsByPriceRange: Restaurant[];
  restaurantsByDistance: Restaurant[];
  restaurantsByRatings: Restaurant[];
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
  min: 1,
  max: 2,
  restaurantsDistances: [],
  distance: 0.1,
  selectedRating: [0],
  newData:[],
  secondFilter:"",
  restaurantsByPriceRange:[],
  restaurantsByDistance: [],
  restaurantsByRatings: [],
};

const restaurantsPageSlice = createSlice({
  name: "restaurantsPage",
  initialState,
  reducers: {
    setAllRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.allRestaurants=action.payload;
      
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
    setPage(state, action: PayloadAction<number>) {
      state.page=action.payload;
      if(action.payload==0){
        state.page=1;
      }
      console.log("state.page :",state.page);
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
    },
    setSecondFilter(state, action: PayloadAction<string>) {
      state.secondFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantsPageData.fulfilled, (state, action) => {
      state.allRestaurants=action.payload.allRestaurants;
      state.newRestaurants = action.payload.newRestaurants;
      state.popularRestaurants = action.payload.popularRestaurants;
      state.openNowRestaurants = action.payload.openNowRestaurants;
      state.restaurantsPrices= action.payload.restaurantsPrices;
      state.restaurantsDistances=action.payload.restaurantsDistances;
      state.restaurantByPrices=action.payload.restaurantsByPriceRange;
      state.restaurantsByDistance=action.payload.restaurantsByDistance;
      state.restaurantsByRatings=action.payload.restaurantsByRatings;
    });
  },
});

export const {
  setFirstFilter,
  setSecondFilter,
  setSelectedRating,
  setDistance,
  setData,
  setNewData,
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
