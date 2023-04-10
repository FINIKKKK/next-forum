import { ParamsDto, TBase, TTotal } from '../../types';

export type TUsers = TTotal & {
  items: TUser[];
};

export type TUser = TBase & {
  login: string;
  email: string;
  password: string | null;
  name: string | null;
  avatar: string | null;
  token: string;
  questionCount: number;
  answerCount: number;
  location: string | null;
  favorites: Number[];
  about: string | null;
  showEmail: boolean;
};

export type UpdateUserDto = Partial<TUser>;

export type ParamsUserDto = ParamsDto & {
  search?: string;
};
