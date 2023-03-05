import ss from "./UserBox.module.scss";
import Link from "next/link";
import React from "react";

interface UserBoxProps {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  login: string;
  className: string;
}

export const UserBox: React.FC<UserBoxProps> = ({
  id,
  avatar,
  login,
  firstName,
  lastName,
  className,
}) => {
  return (
    <div className={`${className} ${ss.user}`}>
      <Link href={`/profile/${id}`}>
        <img
          src={
            avatar !== null
              ? `http://localhost:7777/img/avatars/${avatar}`
              : `../img/avatar.png`
          }
          alt="avatar"
          className={`avatar ${ss.avatar}`}
        />
      </Link>
      <div className={ss.info}>
        {firstName !== null ||
          (lastName !== null && (
            <div className={ss.name}>
              {firstName} {lastName}
            </div>
          ))}
        <Link href={`/profile/${id}`}>
          <h6 className={ss.login}>@{login}</h6>
        </Link>
      </div>
    </div>
  );
};
