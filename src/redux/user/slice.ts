import { TUser } from "@/utils/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserSlice } from "./types";

const initialState: TUserSlice = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<TUser>) {
      state.data = payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
