import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chef } from "@/Model/Interfaces";
import  {chefAPI}  from "@/Model/APIs/ChefAPI";


interface ChefsPageData {
  allChefs: Chef[];
  newChefs: Chef[];
  mostViewedChefs: Chef[];
}
export const fetchChefsPageData = createAsyncThunk("chefsPage/fetchData", async (): Promise<ChefsPageData> => {
  const allChefs = await chefAPI.getAllChefs();
  const newChefs = await chefAPI.getNewChefs();
  const mostViewedChefs = await chefAPI.getMostViewedChefs();
  return {
    allChefs: allChefs,
    newChefs: newChefs,
    mostViewedChefs: mostViewedChefs,
  };
});
