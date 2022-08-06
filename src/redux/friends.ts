import { createSlice } from "@reduxjs/toolkit";
import { Friend } from "../types";

interface Action {
  type: string;
  payload: {
    index?: number;
    friend?: Friend;
  };
}

const initialState: Friend[] = [
  {
    emoji: "👻",
    name: "",
    expense: 0,
  },
];

export const friendsSlice = createSlice({
  name: "friends",
  initialState: initialState,
  reducers: {
    addFriend: (state, action: Action) => {
      if (!action.payload.friend) return;

      state.push(action.payload.friend);
    },
    deleteFriend: (state, action: Action) => {
      if (action.payload.index == null) return;

      state.splice(action.payload.index, 1);
    },
    editFriend: (state, action: Action) => {
      if (action.payload.index == null || !action.payload.friend) return;

      state[action.payload.index] = action.payload.friend;
    },
  },
});

export const { addFriend, editFriend, deleteFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
