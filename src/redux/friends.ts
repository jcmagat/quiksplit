import { createSlice } from "@reduxjs/toolkit";
import { Friend } from "../types";

const myFriends: Friend[] = [
  { id: 0, name: "Hector", expense: 50 },
  { id: 1, name: "Juan", expense: 70 },
];

interface Action {
  type: string;
  payload: Friend;
}

export const friendsSlice = createSlice({
  name: "friends",
  initialState: myFriends,
  reducers: {
    add: (state, action: Action) => {
      state.push(action.payload);
    },
  },
});

export const { add } = friendsSlice.actions;

export default friendsSlice.reducer;
