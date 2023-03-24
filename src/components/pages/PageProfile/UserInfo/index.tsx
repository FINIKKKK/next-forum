import React from 'react';

import { Avatar } from '@/components';
import { useActions } from '@/hooks/useActions';
import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';
import { TUser } from '@/utils/api/models/user/types';

import ss from './UserInfo.module.scss';

interface UserInfoProps {
  user: TUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { data: userData } = useSelectors((state) => state.user);
  const isAuthor = userData?.id === user.id;
  const [isEdit, setIsEdit] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(user.name);
  const [locationValue, setLocationValue] = React.useState(user.location);
  const [avatar, setAvatar] = React.useState(user.avatar);
  const { setUserAvatar } = useActions();

  const onEditContent = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

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
    <div className={`block ${ss.user}`}>
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
          <input
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className={`${ss.input} ${ss.inputName}`}
            placeholder="Имя"
            type="text"
          />
        )}
        {!isEdit && <h6 className={ss.login}>@{user.login}</h6>}
      </div>
      <div className={ss.extra}>
        {isEdit ? (
          <input
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            className={`${ss.input} ${ss.inputLocation}`}
            placeholder="Местоположение"
            type="text"
          />
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
      </div>
      {/* <div className={ss.footer}>
        {isAuthor ? (
          <button onClick={onEditContent} className={`btn ${ss.edit}`}>
            {!isEdit ? "Редактировать" : "Сохранить"}
          </button>
        ) : (
          <button className={`btn ${ss.subscribe}`}>Подписаться</button>
        )}
      </div> */}
    </div>
  );
};
