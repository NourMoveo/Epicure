import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chef } from "@/Model/Interfaces";
import { chefAPI } from "@/Model/APIs/ChefAPI";

interface FetchChefsDataParams {
  page: number;
  limit: number;
  activeButton: string;
}

export const fetchChefsPageData = createAsyncThunk("chefsPage/fetchData", async ({ page, limit, activeButton }: FetchChefsDataParams) => {
  try {
    const chefsToShow: Chef[] = await chefAPI.getFilteredChefs(page, limit, activeButton);
    return chefsToShow;
  } catch (error) {
    console.error("Error fetching chefs page data:", error);
    throw error;
  }
});
