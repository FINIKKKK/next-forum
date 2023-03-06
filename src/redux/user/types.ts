import { TUser } from "@/utils/api/models/user/types";

export type TUserSlice = {
  data: TUser | null;
  theme: Theme;
};

export enum Theme {
  dark = "Dark",
  light = "Light",
}
