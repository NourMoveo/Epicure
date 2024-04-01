import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant, Dish, Chef } from "@/Model/Interfaces";
import { fetchHomePageData } from "../thunks/homePageThunk";

interface HomePageState {
  popularRestaurants: Restaurant[];
  popularRestaurantsLoading: boolean;
  signatureDishes: Dish[];
  signatureDishesLoading: boolean;
  chefOfTheWeek: Chef;
  chefOfTheWeekLoading: boolean;
  selectedRestaurant: Restaurant | null;
  isModalOpen: boolean;
  selectedDish: Dish | null;
  isHomePage:boolean;
  offset: number;
}

const initialState: HomePageState = {
  popularRestaurants: [],
  popularRestaurantsLoading: false,
  signatureDishes: [],
  signatureDishesLoading: false,
  chefOfTheWeek: {
    _id: "",
    fName: "",
    lName: "",
    image: "",
    description: "",
    restaurant: [],
    isChefOfTheWeek: false,
    isMostViewedChef: false,
  },
  chefOfTheWeekLoading: false,
  selectedRestaurant: null,
  isModalOpen: false,
  selectedDish: null,
  isHomePage:true, 
  offset:0
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setIsHomePage(state, action: PayloadAction<boolean>) {
      state.isHomePage = action.payload;
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    setPopularRestaurantsData(state, action: PayloadAction<Restaurant[]>) {
      state.popularRestaurants = action.payload;
      state.popularRestaurantsLoading = false;
    },
    setSignatureDishesData(state, action: PayloadAction<Dish[]>) {
      state.signatureDishes = action.payload;
      state.signatureDishesLoading = false;
    },
    setChefOfTheWeekData(state, action: PayloadAction<Chef>) {
      state.chefOfTheWeek = action.payload;
      state.chefOfTheWeekLoading = false;
    },
    setSelectedRestaurant(state, action: PayloadAction<Restaurant | null>) {
      state.selectedRestaurant = action.payload;
    },
    setSelectedDish(state, action: PayloadAction<Dish | null>) {
      state.selectedDish = action.payload;
    },
    openModal: (state, action: PayloadAction<Dish>) => {
      state.isModalOpen = true;
      state.selectedDish = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedDish = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomePageData.pending, (state) => {
      state.popularRestaurantsLoading = true;
      state.signatureDishesLoading = true;
      state.chefOfTheWeekLoading = true;
    });
    builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
      state.popularRestaurants = action.payload.popularRestaurants;
      state.signatureDishes = action.payload.signatureDishes;
      state.chefOfTheWeek = action.payload.chefOfTheWeek;
      state.popularRestaurantsLoading = false;
      state.signatureDishesLoading = false;
      state.chefOfTheWeekLoading = false;
    });
  },
});

export const {
  setOffset,
  setIsHomePage,
  setPopularRestaurantsData,
  setSignatureDishesData,
  setChefOfTheWeekData,
  setSelectedRestaurant,
  openModal,
  closeModal,
  setSelectedDish
} = homePageSlice.actions;

export default homePageSlice.reducer;
