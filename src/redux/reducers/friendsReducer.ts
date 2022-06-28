import { createReducer } from "@reduxjs/toolkit";

const friendsReducer = createReducer([], (builder) => {
  builder.addCase("ADD_FRIEND", (state: any, action: any) => {
    state.push(action.payload);
  });
});

export default friendsReducer;
