import Link from "next/link";
import React from "react";

import ss from "./User.module.scss";

interface UserProps {
  id: number;
  login: string;
  avatar?: string | null;
  firstName?: string;
  lastName?: string;
  questionCount: number;
  answerCount: number;
}

export const User: React.FC<UserProps> = ({
  id,
  login,
  avatar,
  firstName,
  lastName,
  questionCount,
  answerCount,
}) => {
  return (
    <div className={`block ${ss.user}`}>
      <div className={ss.inner}>
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
          <p className={ss.name}>
            {firstName} {lastName}
          </p>
          <Link className={ss.login} href={`/profile/${id}`}>
            @{login}
          </Link>
        </div>
      </div>
      <ul className={ss.results}>
        <li>{questionCount} вопросов</li>
        <li>{answerCount} ответов</li>
      </ul>
    </div>
  );
};
