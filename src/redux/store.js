import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slices/appSlice";

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export default store;
