import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';

import { AnswerApi } from './models/answer';
import { AuthApi } from './models/auth';
import { CategoryApi } from './models/category';
import { CommentApi } from './models/comment';
import { FilesApi } from './models/files';
import { PostApi } from './models/post';
import { QuestionApi } from './models/question';
import { TagApi } from './models/tag';
import { UserApi } from './models/user';

export type ApiReturnTypes = {
  auth: ReturnType<typeof AuthApi>;
  user: ReturnType<typeof UserApi>;
  question: ReturnType<typeof QuestionApi>;
  files: ReturnType<typeof FilesApi>;
  tag: ReturnType<typeof TagApi>;
  answer: ReturnType<typeof AnswerApi>;
  comment: ReturnType<typeof CommentApi>;
  category: ReturnType<typeof CategoryApi>;
  post: ReturnType<typeof PostApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext) => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.token;

  const instance = axios.create({
    baseURL: 'http://localhost:7777/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    auth: AuthApi(instance),
    user: UserApi(instance),
    question: QuestionApi(instance),
    files: FilesApi(instance),
    tag: TagApi(instance),
    answer: AnswerApi(instance),
    comment: CommentApi(instance),
    category: CategoryApi(instance),
    post: PostApi(instance),
  };
};
