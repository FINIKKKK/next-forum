import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Input, Warning } from '@/components';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { useSelectors } from '@/hooks/useSelectors';
import { SettingsLayout } from '@/layouts/SettingsLayout';
import { Api } from '@/utils/api';
import {
  UpdateUserDataScheme,
  UpdateUserPasswordScheme,
} from '@/utils/validation';

import ss from './Account.module.scss';

interface AccountProps {}

export const Account: React.FC<AccountProps> = ({}) => {
  const { data: user } = useSelectors((state) => state.user);
  const [email, setEmail] = React.useState(user?.email);
  const [login, setLogin] = React.useState(user?.login);
  const [oldPassword, setOldPassword] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const form1 = useForm({
    mode: 'onChange',
    resolver: yupResolver(UpdateUserDataScheme),
  });
  const form2 = useForm({
    mode: 'onChange',
    resolver: yupResolver(UpdateUserPasswordScheme),
  });

  const updateUserData = async () => {
    try {
      if (user) {
        setIsLoading(true);
        const userName = login
          ? login.replace(/ /g, '_').toLocaleLowerCase()
          : '';
        const dto = {
          email,
          login: userName,
        };
        setLogin(userName);
        await Api().user.update(user.id, dto);
        setMessage('Данные аккаунта успешно обновлены');
      }
    } catch (err) {
      console.warn(err);
      alert('Ошибка при обновление данных пользователя');
    } finally {
      setIsLoading(false);
    }
  };
  const updateUserPassword = async () => {
    try {
      if (user) {
        setIsLoading(true);
        const dto = {
          oldPassword,
          newPassword: password1,
        };
        await Api().user.updatePassword(user.id, dto);
        setMessage('Пароль успешно обновлен');
      }
    } catch (err) {
      setMessage(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useErrorMessage(message, setMessage, 5000);

  return (
    <>
      <FormProvider {...form1}>
        <form
          className={ss.form1}
          onSubmit={form1.handleSubmit(updateUserData)}
        >
          <Input label="Email" value={email} setValue={setEmail} name="email" />
          <Input
            label="Логин"
            value={login}
            setValue={setLogin}
            className={ss.login}
            name="login"
          />
          <button
            className={classNames('btn', ss.btn, {
              disabled: isLoading,
            })}
          >
            Обновить
          </button>
        </form>
      </FormProvider>

      <FormProvider {...form2}>
        <form onSubmit={form2.handleSubmit(updateUserPassword)}>
          <Input
            type="password"
            label="Старый пароль"
            value={oldPassword}
            setValue={setOldPassword}
            name="old_password"
          />
          <Input
            type="password"
            label="Новый пароль"
            value={password1}
            setValue={setPassword1}
            name="password1"
          />
          <Input
            type="password"
            label="Подтвердите пароль"
            value={password2}
            setValue={setPassword2}
            name="password2"
          />

          <div className={ss.footer}>
            <button
              className={classNames('btn', ss.btn, {
                disabled: isLoading,
              })}
            >
              Обновить пароль
            </button>
            <Link className={ss.link} href="/forgot">
              Забыли пароль?
            </Link>
          </div>
        </form>
      </FormProvider>

      <Warning message={message} isActive={!!message} />
    </>
  );
};
