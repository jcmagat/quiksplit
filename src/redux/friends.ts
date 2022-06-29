import { createSlice } from "@reduxjs/toolkit";
import { Friend } from "../types";

interface Action {
  type: string;
  payload: Friend;
}

export const friendsSlice = createSlice({
  name: "friends",
  initialState: [] as Friend[],
  reducers: {
    add: (state, action: Action) => {
      action.payload.id = state.length;
      state.push(action.payload);
    },
    edit: (state, action: Action) => {
      state.forEach((friend) => {
        if (friend.id === action.payload.id) {
          friend.name = action.payload.name;
          friend.expense = action.payload.expense;
        }
      });
    },
  },
});

export const { add, edit } = friendsSlice.actions;

export default friendsSlice.reducer;
