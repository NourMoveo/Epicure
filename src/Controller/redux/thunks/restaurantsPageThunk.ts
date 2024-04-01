import { createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";

interface FetchRestaurantsPageDataParams {
  page?: number;
  limit?: number;
}

export const fetchRestaurantsPageData = createAsyncThunk(
  "restaurantsPage/fetchData",
  async ({ page, limit }: FetchRestaurantsPageDataParams) => {
    try {
      
      console.log(" page, limit ,", page, limit)
      const allRestaurants = await restaurantAPI.getAllRestaurants(1, limit);
      console.log(" allRestaurants :", allRestaurants )
      const newRestaurants = await restaurantAPI.getNewRestaurants(page, limit);
      console.log(" newRestaurants :", newRestaurants )
      const popularRestaurants = await restaurantAPI.getPopularRestaurants(page, limit);
      console.log(" popularRestaurants :", popularRestaurants )
      const openNowRestaurants = await restaurantAPI.getOpenNowRestaurants(page, limit);
      console.log(" openNowRestaurants :", openNowRestaurants )
      const  restaurantsPrices= await restaurantAPI.getRestaurantsPrices();
      const  restaurantsDistances= await restaurantAPI.getRestaurantsDistances();
      
      console.log(" allRestaurants :", allRestaurants )
      console.log(" newRestaurants :", newRestaurants )
      console.log(" popularRestaurants :", popularRestaurants )
      console.log(" openNowRestaurants :", openNowRestaurants )
      return {
        allRestaurants,
        newRestaurants,
        popularRestaurants,
        openNowRestaurants,
        restaurantsPrices,
        restaurantsDistances
      };
    } catch (error) {
      console.error("Error fetching restaurants page data:", error);
      throw error;
    }
  }
);
