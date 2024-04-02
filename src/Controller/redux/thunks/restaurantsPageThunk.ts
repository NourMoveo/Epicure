import { createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";

interface FetchRestaurantsPageDataParams {
  page?: number;
  limit?: number;
  distance: number;
  selectedRating?: number[];
  firstFilter?: string;
  secondFilter?: string;
  min?: number;
  max?: number;
}

export const fetchRestaurantsPageData = createAsyncThunk(
  "restaurantsPage/fetchData",
  async ({ page, limit, firstFilter = "All", distance = 0.1, min = 1, max = 2, selectedRating = [0] }: FetchRestaurantsPageDataParams) => {
    try {
      console.log(page)
      const allRestaurants = await restaurantAPI.getAllRestaurants(page || 1, limit);
      const newRestaurants = await restaurantAPI.getNewRestaurants(page, limit);
      const popularRestaurants = await restaurantAPI.getPopularRestaurants(page, limit);
      const openNowRestaurants = await restaurantAPI.getOpenNowRestaurants(page, limit);
      const restaurantsPrices = await restaurantAPI.getRestaurantsPrices();
      const restaurantsDistances = await restaurantAPI.getRestaurantsDistances();
      const restaurantsByPriceRange = await restaurantAPI.getRestaurantsByPriceRange(page, limit, min, max, firstFilter);
      console.log("page-- ",page,allRestaurants,"------ /n",
        newRestaurants,"------ /n",
        popularRestaurants,"------ /n",
        openNowRestaurants,"------ /n",
        restaurantsPrices,"------ /n",
        restaurantsDistances,"------ /n",
        restaurantsByPriceRange)
      const restaurantsByDistance = await restaurantAPI.getRestaurantsByDistance(page, limit, distance, firstFilter);
      const restaurantsByRatings = await restaurantAPI.getRestaurantsByRatings(page, limit, selectedRating, firstFilter);
      console.log()
      return {
        allRestaurants,
        newRestaurants,
        popularRestaurants,
        openNowRestaurants,
        restaurantsPrices,
        restaurantsDistances,
        restaurantsByPriceRange,
        restaurantsByDistance,
        restaurantsByRatings
      };
    } catch (error) {
      console.error("Error fetching restaurants page data:", error);
      throw error; 
    }
  }
);
