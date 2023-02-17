export type TTags = {
  total: number;
  items: TTag[];
};

export type TTag = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TagDto = {
  name: string;
  description: string;
};

export type SearchTagDto = {
  name?: string;
  limit?: number;
};

export type ParamsTagDto = {
  limit?: number;
  page?: number;
  search?: string;
};
