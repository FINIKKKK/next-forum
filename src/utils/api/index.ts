import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { AuthApi } from './auth';
import { UserApi } from './user';

export type ApiReturnTypes = {
  user: ReturnType<typeof UserApi>;
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
  };
};