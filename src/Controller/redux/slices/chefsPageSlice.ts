import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chef } from "@/Model/Interfaces";
import { fetchChefsPageData } from "../thunks/chefsPageThunk";

interface ChefsPageState {
  chefsToShow: Chef[];
  selectedButton: string | " ";
  limit: number;
}

const initialState: ChefsPageState = {
  chefsToShow: [],
  selectedButton: " ",
  limit: 9,
};

const chefsPageSlice = createSlice({
  name: "chefsPage",
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChefsPageData.fulfilled, (state, action) => {
      state.chefsToShow = action.payload;
    });
  },
});

export const { setLimit } = chefsPageSlice.actions;

export default chefsPageSlice.reducer;
