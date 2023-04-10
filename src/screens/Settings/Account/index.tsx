import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { useErrorMessage } from '@/hooks/useErrorMessage';
import { useSelectors } from '@/hooks/useSelectors';
import { SettingsLayout } from '@/layouts/SettingsLayout';
import { Api } from '@/utils/api';

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

  const onUpdate = async () => {
    try {
      if (user) {
        setIsLoading(true);
        const dto = {};
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
  useErrorMessage(message, setMessage, 5000);

  return (
    <>
      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
      </div>
      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>Логин</label>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
        />
      </div>
      <div className={`inputBlock password ${ss.password} ${ss.inputBlock}`}>
        <label>Старый пароль</label>
        <input
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="text"
        />
      </div>
      <div className={`inputBlock password ${ss.inputBlock}`}>
        <label>Новый пароль</label>
        <input
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          type="text"
        />
      </div>
      <div className={`inputBlock password ${ss.inputBlock}`}>
        <label>Подтвердите пароль</label>
        <input
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          type="text"
        />
      </div>
      <div className={ss.footer}>
        <button
          onClick={onUpdate}
          className={classNames('btn', ss.btn, {
            disabled: isLoading,
          })}
        >
          Обновить
        </button>
        <Link className={ss.link} href="/forgot">
          Забыли пароль?
        </Link>
      </div>
    </>
  );
};
