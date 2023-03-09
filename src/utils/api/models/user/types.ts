import { ParamsDto, TBase, TTotal } from "../../types";

export type TUsers = TTotal & {
  items: TUser[];
};

export type TUser = TBase & {
  login: string;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  token: string;
  questionCount: number;
  answerCount: number;
  location?: string;
};

export type UpdateUserDto = Partial<TUser>;

export type ParamsUserDto = ParamsDto & {
  search?: string;
};
