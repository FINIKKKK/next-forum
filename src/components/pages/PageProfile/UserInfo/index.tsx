import React from 'react';
import Sticky from 'react-stickynode';

import { Avatar } from '@/components';
import { useActions } from '@/hooks/useActions';
import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';
import { TUser } from '@/utils/api/models/user/types';

import ss from './UserInfo.module.scss';

interface UserInfoProps {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  user: TUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  isEdit,
  setIsEdit,
  user,
}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const isAuthor = userData?.id === user.id;
  const [nameValue, setNameValue] = React.useState(user.name);
  const [locationValue, setLocationValue] = React.useState(user.location);
  const [avatar, setAvatar] = React.useState(user.avatar);
  const { setUserAvatar } = useActions();
  const [bottomBoundary, setBottomBoundary] = React.useState<number | null>(
    null,
  );

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
        console.warn(err);
        alert('Ошибка при изменении аватарки');
      }
    }
  };

  return (
    <Sticky top={25} className={`${ss.user}`}>
      <div className="block">
        <div className={ss.avatar__wrapper}>
          <Avatar
            avatar={user.avatar}
            login={user.login}
            className={ss.avatar}
            isAnother
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
            user.name && <div className={ss.name}>{user.name}</div>
          ) : (
            <div className={ss.box}>
              <label className={ss.label}>Имя:</label>
              <input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
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
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                className={`block ${ss.input}`}
                type="text"
              />
            </div>
          ) : (
            user.location && (
              <div className={ss.box}>
                <div className={ss.label}>Местоположение</div>
                <p className={ss.item}>{user.location}</p>
              </div>
            )
          )}
          {!isEdit && (
            <div className={ss.box}>
              <div className={ss.label}>Email</div>
              <p className={ss.item}>{user.email}</p>
            </div>
          )}
          {isEdit && (
            <div className={`${ss.box} ${ss.showEmail}`}>
              <input
                type="checkbox"
                className={ss.checkbox}
                id="checkbox"
                name="checkbox"
              />
              <label className={ss.label} for="checkbox">
                Показывать email
              </label>
            </div>
          )}
        </div>
        <div className={ss.footer}>
          {isAuthor ? (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className={`btn ${ss.edit}`}
            >
              {!isEdit ? 'Редактировать' : 'Сохранить'}
            </button>
          ) : (
            <button className={`btn ${ss.subscribe}`}>Подписаться</button>
          )}
        </div>
      </div>
    </Sticky>
  );
};
