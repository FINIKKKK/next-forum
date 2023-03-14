import { TUser } from "@/utils/api/models/user/types";

export type TUserSlice = {
  data: TUser | null;
  theme: any;
};

export enum Theme {
  dark = "Dark",
  light = "Light",
}
