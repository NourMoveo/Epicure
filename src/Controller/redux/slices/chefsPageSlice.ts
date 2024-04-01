import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Chef} from "@/Model/Interfaces";
import {fetchChefsPageData} from "../thunks/chefsPageThunk";

interface ChefsPageState {
    allChefs: Chef[];
    newChefs: Chef[];
    mostViewedChefs: Chef[];
    selectedButton:string | " ";
    offset:number;
}

const initialState: ChefsPageState = {
  allChefs: [],
  newChefs:[],
  mostViewedChefs: [],
  selectedButton: " ",
  offset:0,
};

const chefsPageSlice = createSlice({
  name: "chefsPage",
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>){
      state.offset=action.payload;
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

export const {setOffset, setAllChefsData, setNewChefsData, setMostViewedChefsData} = chefsPageSlice.actions;

export default chefsPageSlice.reducer;
