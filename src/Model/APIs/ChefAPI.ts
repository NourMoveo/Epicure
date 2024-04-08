import { genericAPI } from "./GenericAPI";
import { Chef } from "@/Model/Interfaces";

class ChefAPI {
  static readonly endpoint = "/chefs";

  async getFilteredChefs(page: number = 1, limit: number = 3, criteria: string = "All"): Promise<Chef[]> {
    try {
      const response = await genericAPI.post<Chef[]>(`${ChefAPI.endpoint}/filtered-chefs`, {
        page,
        limit,
        criteria,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching chefs:", error);
      throw error;
    }
  }

  async getAllChefs(page: number = 1, limit: number = 3): Promise<Chef[]> {
    try {
      const response = await genericAPI.get<Chef[]>(`${ChefAPI.endpoint}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching popular chefs:", error);
      throw error;
    }
  }
  async getNewChefs(page: number = 1, limit: number = 3): Promise<Chef[]> {
    try {
      const response = await genericAPI.get<Chef[]>(`${ChefAPI.endpoint}/new?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching new chefs:", error);
      throw error;
    }
  }
  async getMostViewedChefs(page: number = 1, limit: number = 3): Promise<Chef[]> {
    try {
      const response = await genericAPI.get<Chef[]>(`${ChefAPI.endpoint}/most-viewed?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching new chefs:", error);
      throw error;
    }
  }

  async getChefOfTheWeek(): Promise<Chef> {
    const response = await genericAPI.get<Chef>(`${ChefAPI.endpoint}/chef-of-the-week`);
    return response.data;
  }

  async getChefsByIds(ids: string[]): Promise<Chef[]> {
    try {
      const allChefsResponse = await genericAPI.get<Chef[]>(ChefAPI.endpoint);
      const allChefs = allChefsResponse.data;

      const filteredChefs = allChefs.filter((chef) => ids.includes(chef._id));

      return filteredChefs;
    } catch (error) {
      console.error("Error fetching chefs by IDs:", error);
      throw error;
    }
  }
}

export const chefAPI = new ChefAPI();
