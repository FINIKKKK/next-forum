import { OutputBlockData } from "@editorjs/editorjs";
import { TTag } from "../tag/types";
import { TUser } from "../user/types";

export type QuestionDto = {
  title: string;
  body: OutputBlockData[];
  tags: TTag[];
};

export type TQuestions = {
  total: number;
  items: TQuestion[];
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

export type SearchQuestionDto = {
  limit?: number;
  page?: number;
  orderBy?: string;
};
