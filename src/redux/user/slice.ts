import { options } from "@/pages";
import { TUser } from "@/utils/api/models/user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { TFilters, TUserSlice } from "./types";

const initialState: TUserSlice = {
  data: null,
  filters: {
    page: 1,
    orderBy: options[0],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<TUser | null>) {
      state.data = payload;
    },
    setFilters(state, { payload }: PayloadAction<TFilters>) {
      state.filters.page = Number(payload.page);
      state.filters.orderBy = payload.orderBy;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }: PayloadAction<TUser>) => {
      state.data = payload?.user?.data;
    },
  },
});

// export const userActions = userSlice.actions;
export const { setUserData, setFilters } = userSlice.actions;

export default userSlice.reducer;
