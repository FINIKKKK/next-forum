import { TBase } from '../../types';

export type TCategory = TBase & {
  name: string;
  description: string;
  postsCount: number;
};
