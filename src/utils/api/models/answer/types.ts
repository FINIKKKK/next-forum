import { OutputBlockData } from "@editorjs/editorjs";
import { TQuestion } from "../question/types";
import { TUser } from "../user/types";

export type AnswerDto = {
  questionId: number;
  body: OutputBlockData[];
};

export type TAnswer = {
  id: number;
  body: OutputBlockData[];
  user: TUser;
  question: TQuestion;
  createdAt: string;
  updatedAt: string;
};

export type ParamsAnswerDto = {
  questionId: number;
};
