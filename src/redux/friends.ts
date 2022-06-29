import { createSlice } from "@reduxjs/toolkit";
import { Friend, FriendMap } from "../types";

interface Action {
  type: string;
  payload: Friend;
}

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {} as FriendMap,
  reducers: {
    add: (state, action: Action) => {
      state[Object.keys(state).length] = action.payload;
    },
    edit: (state, action: Action) => {
      state[Object.keys(state).length] = action.payload;
    },
  },
});

export const { add, edit } = friendsSlice.actions;

export default friendsSlice.reducer;
