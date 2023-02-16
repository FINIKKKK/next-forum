import { TUser } from "@/utils/api/models/user/types";

export type TUserSlice = {
  data: TUser | null;
  filters: TFilters;
};

export type TFilters = {
  page: number;
  orderBy: {
    value: string;
    label: string;
  };
};
