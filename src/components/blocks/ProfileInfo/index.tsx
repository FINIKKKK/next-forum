import React from 'react';
import Sticky from 'react-stickynode';

import { Avatar, Warning } from '@/components';
import { useActions } from '@/hooks/useActions';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { Api } from '@/utils/api';
import { TUser } from '@/utils/api/models/user/types';

import ss from './ProfileInfo.module.scss';

interface ProfileInfoProps {
  isAuthor: boolean;
  isEdit: boolean;
  user: TUser;
  onUpdateUserData: () => void;
  name?: string;
  location?: string;
  showEmail: boolean;
  setName: (value: string) => void;
  setLocation: (value: string) => void;
  setShowEmail: (value: boolean) => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  isAuthor,
  isEdit,
  user,
  onUpdateUserData,
  setName,
  setLocation,
  setShowEmail,
  name,
  location,
  showEmail,
}) => {
  const { setUserAvatar } = useActions();
  const [avatar, setAvatar] = React.useState(user.avatar);
  const [error, setError] = React.useState('');

  const onUpdateAvatar = async (e: any) => {
    if (e.target.files) {
      try {
        const avatar = await Api().user.updateAvatar(
          user.id,
          e.target.files[0],
        );
        setAvatar(avatar);
        setUserAvatar(avatar);
      } catch (err) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      }
    }
  };

  useErrorMessage(error, setError, 5000);

  return (
    <>
      <Sticky top={25} className={`${ss.user}`}>
        <div className="block">
          <div className={ss.avatar__wrapper}>
            <Avatar
              avatar={avatar}
              login={user.login}
              className={ss.avatar}
              type="profile"
            />
            {isAuthor && (
              <div className={ss.avatar__edit}>
                <input type="file" onChange={onUpdateAvatar} />
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#edit" />
                </svg>
              </div>
            )}
          </div>
          <div className={ss.info}>
            {!isEdit ? (
              user.name && <div className={ss.name}>{name}</div>
            ) : (
              <div className={ss.box}>
                <label className={ss.label}>Имя:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`block ${ss.input}`}
                  type="text"
                />
              </div>
            )}
            {!isEdit && <h6 className={ss.login}>@{user.login}</h6>}
          </div>
          <div className={ss.extra}>
            {isEdit ? (
              <div className={ss.box}>
                <label className={ss.label}>Местоположение:</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`block ${ss.input}`}
                  type="text"
                />
              </div>
            ) : (
              location && (
                <div className={ss.box}>
                  <div className={ss.label}>Местоположение</div>
                  <p className={ss.item}>{location}</p>
                </div>
              )
            )}
            {!isEdit && showEmail && (
              <div className={ss.box}>
                <div className={ss.label}>Email</div>
                <p className={ss.item}>{user.email}</p>
              </div>
            )}
            {isEdit && (
              <div className={`${ss.box} ${ss.showEmail}`}>
                <input
                  checked={showEmail}
                  onChange={(e) => setShowEmail(e.target.checked)}
                  type="checkbox"
                  className={ss.checkbox}
                  id="checkbox"
                  name="checkbox"
                />
                <label className={ss.label} htmlFor="checkbox">
                  Показывать email
                </label>
              </div>
            )}
          </div>
          <div className={ss.footer}>
            {isAuthor ? (
              <button onClick={onUpdateUserData} className={`btn ${ss.edit}`}>
                {!isEdit ? 'Редактировать' : 'Сохранить'}
              </button>
            ) : (
              <button className={`btn ${ss.subscribe}`}>Подписаться</button>
            )}
          </div>
        </div>
      </Sticky>

      <Warning message={error} isActive={!!error} />
    </>
  );
};
