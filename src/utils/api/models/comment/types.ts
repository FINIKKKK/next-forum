import { TBase, TTotal } from '../../types';
import { TAnswer } from '../answer/types';
import { TQuestion } from '../question/types';
import { TUser } from '../user/types';

export type TComments = TTotal & {
  items: TComment[];
};

export type TComment = TBase & {
  text: string;
  user: TUser;
  question?: TQuestion;
  answer?: TAnswer;
};

export type CommentDto = {
  text: string;
  questionId?: number;
  answerId?: number;
};

export type ParamsCommentDto = {
  questionId?: number;
  answerId?: number;
  postId?: number;
};
