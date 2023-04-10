import classNames from 'classnames';
import React from 'react';

import { Avatar, Input, Warning } from '@/components';
import { useActions } from '@/hooks/useActions';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { usePressKey } from '@/hooks/usePressKey';
import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';

import ss from './Profile.module.scss';

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const { data: user } = useSelectors((state) => state.user);
  const [name, setName] = React.useState(user?.name || '');
  const [location, setLocation] = React.useState(user?.location || '');
  const [about, setAbout] = React.useState(user?.about || '');
  const [showEmail, setShowEmail] = React.useState(user?.showEmail);
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUserAvatar } = useActions();

  const onUpdate = async () => {
    try {
      if (user) {
        setIsLoading(true);
        const dto = {
          name,
          location,
          about,
          showEmail,
        };
        await Api().user.update(user.id, dto);
        setMessage('Данные профиля успешно обновлены');
      }
    } catch (err) {
      console.warn(err);
      alert('Ошибка при обновление данных пользователя');
    } finally {
      setIsLoading(false);
    }
  };
  useErrorMessage(message, setMessage, 5000);

  const removeAvatar = async () => {
    try {
      if (user) {
        setIsLoading(true);
        await Api().user.update(user.id, { avatar: null });
        setUserAvatar(null);
        setMessage('Аватар удален');
      }
    } catch (err) {
      console.warn(err);
      alert('Ошибка при удалении аватара');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAvatar = async (e: any) => {
    try {
      if (user && e.target.files) {
        setIsLoading(true);
        const avatar = await Api().user.updateAvatar(
          user.id,
          e.target.files[0],
        );
        setUserAvatar(avatar);
        setMessage('Аватар обновлен');
      }
    } catch (err) {
      console.warn(err);
      setMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={ss.avatar}>
        <Avatar avatar={user?.avatar} type="profile" className={ss.img} />
        <div className={ss.avatar__btns}>
          <div
            className={classNames('btn', ss.btn, {
              disabled: isLoading,
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#edit" />
            </svg>
            <p>Выбрать изображение</p>
            <input type="file" onChange={updateAvatar} />
          </div>
          <div
            onClick={removeAvatar}
            className={classNames('btn', ss.btn, ss.btn2, {
              disabled: isLoading,
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#remove" />
            </svg>
            <p>Удалить изображение</p>
          </div>
        </div>
      </div>

      <form>
        <Input label="Имя и фамилия" value={name} setValue={setName} className={ss.name} />
        <Input
          type="checkbox"
          label="Показывать email"
          value={showEmail}
          setValue={setShowEmail}
        />
        <Input label="Местоположение" value={location} setValue={setLocation} />
        <Input
          type="textarea"
          label="О себе"
          value={about}
          setValue={setAbout}
          className={ss.textarea}
        />

        <button
          onClick={onUpdate}
          className={classNames('btn', ss.btn, {
            disabled: isLoading,
          })}
        >
          Обновить
        </button>
      </form>

      <Warning message={message} isActive={!!message} />
    </>
  );
};
