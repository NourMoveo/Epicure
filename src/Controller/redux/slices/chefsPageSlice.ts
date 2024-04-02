import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Chef} from "@/Model/Interfaces";
import {fetchChefsPageData} from "../thunks/chefsPageThunk";

interface ChefsPageState {
    allChefs: Chef[];
    newChefs: Chef[];
    mostViewedChefs: Chef[];
    selectedButton:string | " ";
    page:number;
    limit:number;
    chefsToShow:Chef[];
}

const initialState: ChefsPageState = {
  allChefs: [],
  newChefs:[],
  mostViewedChefs: [],
  selectedButton: " ",
  page:1,
  chefsToShow:[],
  limit:3,
};

const chefsPageSlice = createSlice({
  name: "chefsPage",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>){
      state.page=action.payload;
      if(action.payload==0){
        state.page=1;
      }
    },setLimit(state, action: PayloadAction<number>){
      state.limit=action.payload;
    },setChefsToShow(state, action: PayloadAction<Chef[]>){
      state.chefsToShow=[... action.payload];
    },
    setAllChefsData(state, action: PayloadAction<Chef[]>) {
        state.allChefs = action.payload;
      },
      setNewChefsData(state, action: PayloadAction<Chef[]>) {
        state.newChefs = action.payload;
      },
      setMostViewedChefsData(state, action: PayloadAction<Chef[]>) {
        state.mostViewedChefs = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChefsPageData.fulfilled, (state, action) => {
        state.allChefs = action.payload.allChefs;
        state.newChefs = action.payload.newChefs;
        state.mostViewedChefs = action.payload.mostViewedChefs;
    });
  },
});

export const {setLimit,setPage,setChefsToShow, setAllChefsData, setNewChefsData, setMostViewedChefsData} = chefsPageSlice.actions;

export default chefsPageSlice.reducer;
