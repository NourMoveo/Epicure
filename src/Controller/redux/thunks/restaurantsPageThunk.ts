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
      const allRestaurants = await restaurantAPI.getAllRestaurants(1, limit);
      const newRestaurants = await restaurantAPI.getNewRestaurants(page, limit);
      const popularRestaurants = await restaurantAPI.getPopularRestaurants(page, limit);
      const openNowRestaurants = await restaurantAPI.getOpenNowRestaurants(page, limit);
      const  restaurantsPrices= await restaurantAPI.getRestaurantsPrices();
      const  restaurantsDistances= await restaurantAPI.getRestaurantsDistances();

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
