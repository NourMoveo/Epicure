import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "../slices/homePageSlice";
import restaurantsPageReducer from "../slices/restaurantsPageSlice";
import chefsPageReducer from "../slices/chefsPageSlice";
import signInPageReducer from "../slices/signInPageSlice";
import dishOrderPageReducer from "../slices/dishOrderSlice";

const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    restaurantsPage: restaurantsPageReducer,
    chefsPage: chefsPageReducer,
    signInPage: signInPageReducer,
    dishOrderPage: dishOrderPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
