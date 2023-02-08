import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { AuthApi } from './auth';

export type ApiReturnTypes = {
  auth: ReturnType<typeof AuthApi>;
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
  };
};