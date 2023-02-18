export type TBase = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ParamsDto = {
  limit?: number;
  page?: number;
};

export type TTotal = {
  total: number;
};
