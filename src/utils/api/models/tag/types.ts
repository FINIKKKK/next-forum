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
