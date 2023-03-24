import user, { userSlice } from "./user/slice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const makeStore = () => {
  const store = configureStore({
    reducer: {
      user,
    },
  });

  // if (typeof window !== "undefined") {
  //   store.dispatch((dispatch) => {
  //     const storedTheme = window.localStorage.getItem("theme");
  //     if (storedTheme) {
  //       dispatch(userSlice.actions.setTheme(storedTheme));
  //     }
  //   });
  // }

  return store;
};

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore);
