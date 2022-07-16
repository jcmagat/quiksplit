import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import friendsReducer from "./friends";

const store = configureStore({
  reducer: {
    friends: friendsReducer,
  },
});

// Custom hooks
type RootState = ReturnType<typeof store.getState>;

export const useFriends = () => {
  return useSelector((state: RootState) => state.friends);
};

export default store;
