import Link from "next/link";
import React from "react";

import ss from "./User.module.scss";

interface UserProps {
  id: number;
  login: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export const User: React.FC<UserProps> = ({
  id,
  login,
  avatar,
  firstName,
  lastName,
}) => {
  return (
    <div className={`block ${ss.user}`}>
      <Link className={ss.avatar} href={`/profile/${id}`}>
        <img
          src={
            avatar !== null
              ? `http://localhost:7777/img/avatars/${avatar}`
              : "../img/avatar.png"
          }
          alt="avatar"
        />
      </Link>
      <div className={ss.info}>
        <Link className={ss.login} href={`/profile/${id}`}>
          @{login}
        </Link>
        <p>
          {firstName} {lastName}
        </p>
      </div>
    </div>
  );
};
