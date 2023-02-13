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
  tags: TTag[];
};

export type TQuestion = {
  id: number;
  title: string;
  body: OutputBlockData[];
  user: TUser;
  tags: TTag[];
  views: number;
  createdAt: string;
  updatedAt: string;
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
