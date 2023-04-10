import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { Input } from '@/components';
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
    <form>
      <Input label="Email" value={email} setValue={setEmail} />
      <Input label="Логин" value={login} setValue={setLogin} className={ss.login} />
      <Input
        type="password"
        label="Старый пароль"
        value={oldPassword}
        setValue={setOldPassword}
      />
      <Input
        type="password"
        label="Новый пароль"
        value={password1}
        setValue={setPassword1}
      />
      <Input
        type="password"
        label="Подтвердите пароль"
        value={password2}
        setValue={setPassword2}
      />

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
    </form>
  );
};
