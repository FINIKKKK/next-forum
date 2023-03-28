import { OutputBlockData } from "@editorjs/editorjs";
import { TBase } from "../../types";
import { TQuestion } from "../question/types";
import { TUser } from "../user/types";

export type TAnswer = TBase & {
  body: OutputBlockData[];
  user: TUser;
  question: TQuestion;
  isAnswer: boolean;
  rating: number;
};

export type AnswerDto = {
  questionId: number;
  body: OutputBlockData[];
  isAnswer: boolean;
};
export type UpdateAnswerDto = Partial<AnswerDto>;

export type ParamsAnswerDto = {
  questionId: number;
};
