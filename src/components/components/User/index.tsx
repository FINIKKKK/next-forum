import ss from "./User.module.scss";
import Link from "next/link";
import React from "react";

interface UserProps {
  id: number;
  login: string;
  avatar?: string | null;
  name?: string;
  questionCount: number;
  answerCount: number;
}

export const User: React.FC<UserProps> = ({
  id,
  login,
  avatar,
  name,
  questionCount,
  answerCount,
}) => {
  return (
    <div className={`block ${ss.user}`}>
      <div className={ss.inner}>
        <Link className={`avatar ${ss.avatar}`} href={`/users/${id}`}>
          {avatar ? (
            <img
              className="avatar"
              src={`http://localhost:7777/img/avatars/${avatar}`}
              alt="avatar"
            />
          ) : (
            <svg
              width="164"
              height="164"
              viewBox="0 0 164 164"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="82" cy="82" r="82" fill="#39304D" />
              <path
                d="M103.639 66.6075C103.639 78.6919 93.8424 88.4888 81.7574 88.4888C69.6722 88.4888 59.876 78.6917 59.876 66.6075C59.876 54.5232 69.6723 44.7261 81.7574 44.7261C93.8418 44.7261 103.639 54.5232 103.639 66.6075Z"
                fill="#1F1A30"
              />
              <path
                d="M119.457 114.376C115.143 102.356 105.384 93.0081 93.056 89.4126C92.6454 89.3101 92.2341 89.3101 91.926 89.515C88.8439 91.1589 85.4538 92.0833 81.7555 92.0833C78.0573 92.0833 74.667 91.1589 71.5851 89.515C71.277 89.3094 70.8657 89.3094 70.4551 89.4126C58.1277 93.0085 48.3682 102.356 44.0536 114.376C42.8211 117.766 45.2861 121.259 48.8819 121.259H114.731C118.226 121.259 120.691 117.664 119.458 114.376H119.457Z"
                fill="#1F1A30"
              />
            </svg>
          )}
        </Link>
        <div className={ss.info}>
          <p className={ss.name}>{name}</p>
          <Link className={ss.login} href={`/users/${id}`}>
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
