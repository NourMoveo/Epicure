import { createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";

interface FetchRestaurantsPageDataParams {
  page: number;
  limit: number;
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
      const [Restaurants] = await Promise.all([
        restaurantAPI.getFilteredRestaurants(page, limit, {
          filterBy: primaryButton,
          secondary: secondary,
          ratingsArray: selectedRating,
          distance: newDistance,
          minPrice: newMin,
          maxPrice: newMax,
        }),
      ]);

      return {
        Restaurants,
      };
    } catch (error) {
      console.error("Error fetching restaurants page data:", error);
      throw error;
    }
  }
);
