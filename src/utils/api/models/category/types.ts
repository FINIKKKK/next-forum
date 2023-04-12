import { TBase } from '../../types';

export type TCategory = TBase & {
  value: string;
  label: string;
  description: string;
  postsCount: number;
};
