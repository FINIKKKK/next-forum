import { AuthInput } from '@/components';
import { useActions } from '@/hooks/useActions';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Api } from '@/utils/api';
import { LoginUserDto } from '@/utils/api/models/auth/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface LoginPageProps {}

const LoginPage: NextPage<LoginPageProps> = ({}) => {
  const form = useForm();
  const [error, setError] = React.useState('');
  const { setUserData } = useActions();
  const router = useRouter();

  const onSubmit = async (dto: LoginUserDto) => {
    try {
      const user = await Api().auth.login(dto);
      setCookie(null, 'token', user.token, {
        maxAge: 30 * 60 * 24 * 60,
        path: '/',
      });
      setUserData(user.token);
      setError('');
      router.push('/');
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="title">Вход</h1>
          <ul className="socNav">
            <li className="item">
              <a href="#" title="Войти с помощью Github">
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#github" />
                </svg>
              </a>
            </li>
            <li className="item">
              <a href="#" title="Войти с помощью Google">
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#google" />
                </svg>
              </a>
            </li>
          </ul>
          <p className="text">
            Пожалуйста, заполните данные, чтобы войти в аккаунт
          </p>
          <div className="errorMessage">{error}</div>

          <div className="inputs">
            <AuthInput name="email" icon="email" label="Email" />
            <AuthInput
              name="password"
              icon="lock"
              label="Пароль"
              isPassword={true}
            />
          </div>

          <button className="btn">Вход</button>
          <div className="copy">
            Уже есть аккаунт? <Link href="/register">Зарегестрироваться</Link>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default LoginPage;
