import classNames from 'classnames';
import React from 'react';

import { Avatar, Warning } from '@/components';
import { useActions } from '@/hooks/useActions';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { usePressKey } from '@/hooks/usePressKey';
import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';

import ss from './Profile.module.scss';

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const { data: user } = useSelectors((state) => state.user);
  const [name, setName] = React.useState(user?.name);
  const [location, setLocation] = React.useState(user?.location);
  const [about, setAbout] = React.useState(user?.about);
  const [showEmail, setShowEmail] = React.useState(user?.showEmail);
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUserAvatar } = useActions();
  const [file, setFile] = React.useState(null);

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

      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>Имя и фамилия</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </div>

      <div className={`inputBlock checkbox ${ss.inputBlock}`}>
        <input
          checked={showEmail}
          onChange={(e) => setShowEmail(e.target.checked)}
          type="checkbox"
          id="checkbox"
          name="checkbox"
        />
        <label htmlFor="checkbox">Показывать email</label>
      </div>

      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>Местоположение</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
        />
      </div>

      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>О себе:</label>
        <textarea
          maxLength={900}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          onKeyPress={(e: any) => usePressKey(e, 'Enter')}
          className="input block"
        ></textarea>
      </div>

      <button
        onClick={onUpdate}
        className={classNames('btn', ss.btn, {
          disabled: isLoading,
        })}
      >
        Обновить
      </button>

      <Warning message={message} isActive={!!message} />
    </>
  );
};
