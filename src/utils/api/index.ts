import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { AuthApi } from './models/auth';
import { QuestionApi } from './models/question';
import { UserApi } from './models/user';

export type ApiReturnTypes = {
  auth: ReturnType<typeof AuthApi>;
  user: ReturnType<typeof UserApi>;
  question: ReturnType<typeof QuestionApi>;
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
  };
};