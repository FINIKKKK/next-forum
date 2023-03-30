import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { TUser } from '@/utils/api/models/user/types';

import { Theme, TUserSlice } from './types';

const initialState: TUserSlice = {
  data: null,
  theme: Theme.light,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<TUser | null>) {
      state.data = payload;
    },
    setUserAvatar(state, { payload }: PayloadAction<string>) {
      if (state.data) {
        state.data.avatar = payload;
      }
    },
    setTheme(state, { payload }: PayloadAction<any>) {
      state.theme = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => {
      state.data = payload?.user?.data;
    });
  },
});

export const userActions = userSlice.actions;
export const { setUserData } = userSlice.actions;
export { userSlice };
export default userSlice.reducer;
