import { ParamsDto, TBase, TTotal } from "../../types";

export type TTags = TTotal & {
  items: TTag[];
};

export type TTag = TBase & {
  name: string;
  description: string;
};

export type TagDto = {
  name: string;
  description: string;
};

export type SearchTagDto = {
  name?: string;
  limit?: number;
};

export type ParamsTagDto = ParamsDto & {
  search?: string;
};
