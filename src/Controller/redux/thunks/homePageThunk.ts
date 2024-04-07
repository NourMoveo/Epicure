import { createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";
import { dishAPI } from "@/Model/APIs/DishAPI";
import { chefAPI } from "@/Model/APIs/ChefAPI";
import { Dish, Restaurant, Chef, dataTypes } from "@/Model/Interfaces";
import homePageSlice from "../slices/homePageSlice";

interface HomePageData {
  popularRestaurants: Restaurant[];
  signatureDishes: Dish[];
  chefOfTheWeek: Chef;
  restaurantsDistances: number[];
  restaurantsPrices: number[];
}

export const fetchHomePageData = createAsyncThunk("homePage/fetchData", async (): Promise<HomePageData> => {
  const [popularRestaurants, signatureDishes, chefOfTheWeek, restaurantsPrices, restaurantsDistances] = await Promise.all([
    restaurantAPI.getFilteredRestaurants(1, 3, { filterBy: "Popular", secondary: "" }),
    dishAPI.getSignatureDishes(),
    chefAPI.getChefOfTheWeek(),
    restaurantAPI.getRestaurantsPrices(),
    restaurantAPI.getRestaurantsDistances(),
  ]);

  return {
    popularRestaurants,
    restaurantsPrices,
    restaurantsDistances,
    signatureDishes,
    chefOfTheWeek,
  };
});
