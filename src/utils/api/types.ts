import { OutputBlockData } from "@editorjs/editorjs";

export type LoginUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = {
  login: string;
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  login: string;
  email: string;
  password?: string;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
  token: string;
};

export type QuestionDto = {
  title: string;
  body: OutputBlockData[];
  // author: TUser;
  // tags?: string[];
};

export type TQuestion = {
  id: number;
  title: string;
  body: OutputBlockData[];
  user: TUser;
  tags?: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
};
