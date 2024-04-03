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
  async ({
    page,
    limit,
    firstFilter = "All",
    distance = 0.1,
    min = 1,
    max = 2,
    selectedRating = [0],
  }: FetchRestaurantsPageDataParams) => {
    try {
      console.log(page);
      // const allRestaurants = await restaurantAPI.getAllRestaurants(page || 1, limit);
      // const newRestaurants = await restaurantAPI.getNewRestaurants(page, limit);
      // const popularRestaurants = await restaurantAPI.getPopularRestaurants(page, limit);
      // const openNowRestaurants = await restaurantAPI.getOpenNowRestaurants(page, limit);
      // const restaurantsPrices = await restaurantAPI.getRestaurantsPrices();
      // const restaurantsDistances = await restaurantAPI.getRestaurantsDistances();
      // const restaurantsByPriceRange = await restaurantAPI.getRestaurantsByPriceRange(page, limit, min, max, firstFilter);

      const [
        allRestaurants,
        newRestaurants,
        popularRestaurants,
        openNowRestaurants,
        restaurantsPrices,
        restaurantsDistances,
        restaurantsByPriceRange,
        restaurantsByDistance,
        restaurantsByRatings
      ] = await Promise.all([
        restaurantAPI.getAllRestaurants(page || 1, limit),
        restaurantAPI.getNewRestaurants(page, limit),
        restaurantAPI.getPopularRestaurants(page, limit),
        restaurantAPI.getOpenNowRestaurants(page, limit),
        restaurantAPI.getRestaurantsPrices(),
        restaurantAPI.getRestaurantsDistances(),
        restaurantAPI.getRestaurantsByPriceRange(
          page,
          limit,
          min,
          max,
          firstFilter
        ),restaurantAPI.getRestaurantsByDistance(
          page,
          limit,
          distance,
          firstFilter
        ),restaurantAPI.getRestaurantsByRatings(
          page,
          limit,
          selectedRating,
          firstFilter
        )
      ]);

      return {
        allRestaurants,
        newRestaurants,
        popularRestaurants,
        openNowRestaurants,
        restaurantsPrices,
        restaurantsDistances,
        restaurantsByPriceRange,
        restaurantsByDistance,
        restaurantsByRatings,
      };
    } catch (error) {
      console.error("Error fetching restaurants page data:", error);
      throw error;
    }
  }
);
