import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./friends";

const store = configureStore({
  reducer: {
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
