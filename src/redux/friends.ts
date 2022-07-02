import { createSlice } from "@reduxjs/toolkit";
import { Friend, FriendMap } from "../types";

interface Action {
  type: string;
  payload: {
    id?: number;
    friend?: Friend;
  };
}

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {} as FriendMap,
  reducers: {
    addFriend: (state, action: Action) => {
      if (!action.payload.friend) return;

      state[Object.keys(state).length] = action.payload.friend;
    },
    deleteFriend: (state, action: Action) => {
      if (action.payload.id == null) return;

      delete state[action.payload.id];
    },
    editFriend: (state, action: Action) => {
      if (action.payload.id == null || !action.payload.friend) return;

      state[action.payload.id] = action.payload.friend;
    },
  },
});

export const { addFriend, editFriend, deleteFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
