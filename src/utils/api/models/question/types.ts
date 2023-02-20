import { OutputBlockData } from "@editorjs/editorjs";
import { ParamsDto, TBase, TTotal } from "../../types";
import { TTag } from "../tag/types";
import { TUser } from "../user/types";

export type TQuestions = TTotal & {
  items: TQuestion[];
};

export type TQuestion = TBase & {
  title: string;
  body: OutputBlockData[];
  user: TUser;
  tags: TTag[];
  views: number;
  isAsnwer: boolean;
};

export type QuestionDto = {
  title: string;
  body: OutputBlockData[];
  tags: TTag[];
};

export type ParamsQuestionDto = ParamsDto & {
  orderBy?: string;
  tagBy?: string;
  userId?: number;
  search?: string;
};
