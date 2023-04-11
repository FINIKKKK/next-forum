import React from 'react';
import Sticky from 'react-stickynode';

import { Avatar, Input, Warning } from '@/components';
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
              <Input label="Имя" value={name} setValue={setName} />
            )}
            {!isEdit && <h6 className={ss.login}>@{user.login}</h6>}
          </div>
          <div className={ss.extra}>
            {isEdit ? (
              <Input
                label="Местоположение"
                value={location}
                setValue={setLocation}
              />
            ) : (
              location && (
                <Input type="text" label="Местоположение" text={location} />
              )
            )}
            {!isEdit && showEmail && (
              <Input type="text" label="Email" text={user.email} />
            )}
            {isEdit && (
              <Input
                type="checkbox"
                label="Показывать email"
                value={showEmail}
                setValue={setShowEmail}
              />
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
