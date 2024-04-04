import { createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";

interface FetchRestaurantsPageDataParams {
  page?: number;
  limit?: number;
  newMax?: number;
  newMin?: number;
  newDistance?: number;
  selectedRating?: number[];
  primaryButton: string;
  secondary: string;
}

export const fetchRestaurantsPageData = createAsyncThunk(
  "restaurantsPage/fetchData",
  async ({ page, limit, newMax, newMin, newDistance, selectedRating, primaryButton, secondary }: FetchRestaurantsPageDataParams) => {
    try {
      console.log(page);

      // const Restaurants = await restaurantAPI.getFilteredRestaurants(page, limit, {
      //   filterBy: primaryButton,
      //   secondary: secondary,
      //   ratingsArray: selectedRating,
      //   distance: newDistance,
      //   minPrice: newMin,
      //   maxPrice: newMax,
      // });

      // const allRestaurants = await restaurantAPI.getAllRestaurants(page || 1, limit);
      // const newRestaurants = await restaurantAPI.getNewRestaurants(page, limit);
      // const popularRestaurants = await restaurantAPI.getPopularRestaurants(page, limit);
      // const openNowRestaurants = await restaurantAPI.getOpenNowRestaurants(page, limit);
      // const restaurantsPrices = await restaurantAPI.getRestaurantsPrices();
      // const restaurantsDistances = await restaurantAPI.getRestaurantsDistances();
      // const restaurantsByPriceRange = await restaurantAPI.getRestaurantsByPriceRange(page, limit, min, max, firstFilter);

      const [
        Restaurants,
        //   allRestaurants,
        //   newRestaurants,
        //   popularRestaurants,
        //   openNowRestaurants,
        //   restaurantsByPriceRange,
        //   restaurantsByDistance,
        //   restaurantsByRatings,
      ] = await Promise.all([
        restaurantAPI.getFilteredRestaurants(page, limit, {
          filterBy: primaryButton,
          secondary: secondary,
          ratingsArray: selectedRating,
          distance: newDistance,
          minPrice: newMin,
          maxPrice: newMax,
        }),
        //   restaurantAPI.getAllRestaurants(page || 1, limit),
        //   restaurantAPI.getNewRestaurants(page, limit),
        //   restaurantAPI.getPopularRestaurants(page, limit),
        //   restaurantAPI.getOpenNowRestaurants(page, limit),

        //   restaurantAPI.getRestaurantsByPriceRange(page, limit, min, max, firstFilter),
        //   restaurantAPI.getRestaurantsByDistance(page, limit, distance, firstFilter),
        //   restaurantAPI.getRestaurantsByRatings(page, limit, selectedRating, firstFilter),
      ]);

      return {
        Restaurants,
        // allRestaurants,
        // newRestaurants,
        // popularRestaurants,
        // openNowRestaurants,
        // restaurantsPrices,
        // restaurantsDistances,
        // restaurantsByPriceRange,
        // restaurantsByDistance,
        // restaurantsByRatings,
      };
    } catch (error) {
      console.error("Error fetching restaurants page data:", error);
      throw error;
    }
  }
);
