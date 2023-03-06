import { Theme, TUserSlice } from "./types";
import { TUser } from "@/utils/api/models/user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState: TUserSlice = {
  data: null,
  theme: Theme.dark,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<TUser | null>) {
      state.data = payload;
    },
    setTheme(state, { payload }: PayloadAction<Theme>) {
      state.theme = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }: PayloadAction<TUser>) => {
      state.data = payload?.user?.data;
    },
  },
});

export const userActions = userSlice.actions;
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
