import { Restaurant } from "@/Model/Interfaces";
import { genericAPI } from "./GenericAPI";

class RestaurantAPI {
  static readonly endpoint = "/restaurants";

  async getAllRestaurants(
    page: number = 1,
    limit: number = 2): Promise<Restaurant[]> {
    try {
      const response = await genericAPI.get<Restaurant[]>(
        `${RestaurantAPI.endpoint}?page=${page}&limit=${limit}`
      );
      console.log("response.data response.data response.data , ",response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching popular restaurants:", error);
      throw error;
    }
  }
 
  
  async getPopularRestaurants(
    page: number = 1,
    limit: number = 2): Promise<Restaurant[]> {
    try {
      const response = await genericAPI.get<Restaurant[]>(
        `${RestaurantAPI.endpoint}/popular?page=${page}&limit=${limit}`
      );
      console.log("response.data.results popular :", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching popular restaurants:", error);
      throw error;
    }
  }

  async getNewRestaurants(
    page: number = 1,
    limit: number = 2): Promise<Restaurant[]> {
    try {
      const response = await genericAPI.get<Restaurant[]>(
        `${RestaurantAPI.endpoint}/new?page=${page}&limit=${limit}`
      );
      console.log("response.data.results popular :", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching new restaurants:", error);
      throw error;
    }
  }


  async getOpenNowRestaurants(
    page: number = 1,
    limit: number = 2): Promise<Restaurant[]> {
    try {
      const response = await genericAPI.get<Restaurant[]>(
        `${RestaurantAPI.endpoint}/open-now?page=${page}&limit=${limit}`
      );
      console.log("response.data.results popular :", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Open-now restaurants:", error);
      throw error;
    }
  }

  async getRestaurantsByRatings(
    page: number = 1,
    limit: number = 3,ratingsArray: number[]): Promise<Restaurant[]> {
    try {
      const response = await genericAPI.post<Restaurant[]>(
        `${RestaurantAPI.endpoint}/restaurant-by-rating?page=${page}&limit=${limit}`,
        { ratings: ratingsArray }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants by ratings:", error);
      throw error;
    }
  }

  async getRestaurantsByDistance(
    page: number = 1,
    limit: number = 3,distance: number): Promise<Restaurant[]> {
    try {
      const response = await genericAPI.post<Restaurant[]>(
        `${RestaurantAPI.endpoint}/restaurants-by-distance?page=${page}&limit=${limit}`,
        { distance }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants by price range:", error);
      throw error;
    }
  }

  async getRestaurantsByPriceRange(
    page: number = 1,
    limit: number = 3,
    minPrice: number,
    maxPrice: number
  ): Promise<Restaurant[]> {
    try {
      const response = await genericAPI.post<Restaurant[]>(
        `${RestaurantAPI.endpoint}/restaurants-by-price-range?page=${page}&limit=${limit}`,
        { minPrice, maxPrice }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants by price range:", error);
      throw error;
    }
  }
  async getRestaurantById(id: string): Promise<Restaurant> {
    try {
      const response = await genericAPI.get<Restaurant>(
        `${RestaurantAPI.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurant by ID:", error);
      throw error;
    }
  }
}

export const restaurantAPI = new RestaurantAPI();
