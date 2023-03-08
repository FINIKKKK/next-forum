import ss from "./UserInfo.module.scss";
import { useSelectors } from "@/hooks/useSelectors";
import { TUser } from "@/utils/api/models/user/types";
import React from "react";

interface UserInfoProps {
  user: TUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { data: userData } = useSelectors((state) => state.user);
  const isAuthor = userData?.id === user.id;
  const [isEdit, setIsEdit] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(user.name);
  const [locationValue, setLocationValue] = React.useState(user.location);

  const onEditContent = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  return (
    <div className={`user__info block ${ss.user}`}>
      <div className={ss.avatar}>
        <img
          src={
            user.avatar
              ? `http://localhost:7777/img/avatars/${user.avatar}`
              : `../img/avatar.png`
          }
          alt="avatar"
        />
        {isAuthor && (
          <div className={ss.avatar__edit}>
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
      <div className={ss.footer}>
        {isAuthor ? (
          <button onClick={onEditContent} className={`btn ${ss.edit}`}>
            {!isEdit ? "Редактировать" : "Сохранить"}
          </button>
        ) : (
          <button className={`btn ${ss.subscribe}`}>Подписаться</button>
        )}
      </div>
    </div>
  );
};
