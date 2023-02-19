import { TUser } from "@/utils/api/models/user/types";
import Link from "next/link";
import React from "react";

import ss from "./UserBox.module.scss";

interface UserBoxProps {
  user: TUser;
  className: string;
}

export const UserBox: React.FC<UserBoxProps> = ({ user, className }) => {
  return (
    <div className={`${className} ${ss.user}`}>
      <Link href={`/profile/${user.id}`}>
        <img
          src={
            user.avatar !== null
              ? `http://localhost:7777/img/avatars/${user.avatar}`
              : `../img/avatar.png`
          }
          alt="avatar"
          className={`avatar ${ss.avatar}`}
        />
      </Link>
      <div className={ss.info}>
        {user.firstName !== null ||
          (user.lastName !== null && (
            <div className={ss.name}>
              {user.firstName} {user.lastName}
            </div>
          ))}
        <Link href={`/profile/${user.id}`}>
          <h6 className={ss.login}>@{user.login}</h6>
        </Link>
      </div>
    </div>
  );
};
