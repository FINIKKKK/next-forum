import ss from "./UserInfo.module.scss";
import { TUser } from "@/utils/api/models/user/types";
import React from "react";

interface UserInfoProps {
  user: TUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className={`user__info block ${ss.user}`}>
      <img
        src={
          user.avatar !== null
            ? `http://localhost:7777/img/avatars/${user.avatar}`
            : `../img/avatar.png`
        }
        alt="avatar"
        className={`avata ${ss.avatar}`}
      />
      <div className={ss.info}>
        {user.firstName !== null ||
          (user.lastName !== null && (
            <div className={ss.name}>
              {user.firstName} {user.lastName}
            </div>
          ))}
        <h6 className={ss.login}>@{user.login}</h6>
      </div>
      <div className={ss.extra}>
        <div className={ss.box}>
          <div className={ss.label}>Местоположение</div>
          <p className={ss.item}>City 17</p>
        </div>
        <div className={ss.box}>
          <div className={ss.label}>Email</div>
          <p className={ss.item}>krashmate@gmail.com</p>
        </div>
      </div>
      <button className={`btn ${ss.subscribe}`}>Подписаться</button>
    </div>
  );
};
