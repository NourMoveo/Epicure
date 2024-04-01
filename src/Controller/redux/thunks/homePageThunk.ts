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
}

export const fetchHomePageData = createAsyncThunk("homePage/fetchData", async (): Promise<HomePageData> => {
  const restaurantData= await restaurantAPI.getPopularRestaurants();
  const signatureDishes= await dishAPI.getSignatureDishes();
  const chefOfTheWeek = await chefAPI.getChefOfTheWeek();

  return {
    popularRestaurants:  restaurantData,
    signatureDishes: signatureDishes,
    chefOfTheWeek: chefOfTheWeek ,
  };
});
