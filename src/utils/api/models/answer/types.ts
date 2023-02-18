import { OutputBlockData } from "@editorjs/editorjs";
import { TBase } from "../../types";
import { TQuestion } from "../question/types";
import { TUser } from "../user/types";

export type TAnswer = TBase & {
  body: OutputBlockData[];
  user: TUser;
  question: TQuestion;
};

export type AnswerDto = {
  questionId: number;
  body: OutputBlockData[];
};

export type ParamsAnswerDto = {
  questionId: number;
};
