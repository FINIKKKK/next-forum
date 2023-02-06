import Link from "next/link";
import React from "react";

import ss from "./Question.module.scss";

interface QuestionProps {}

export const Question: React.FC<QuestionProps> = ({}) => {
  return (
    <div className="question block hover">
      <div className="left">
        <Link href={`/question/${1}`} className="question__title">
          <h3>string, класс, структуры C++</h3>
        </Link>
        <ul className="tagList">
          <li className="tag hover">
            <a href="#">POSTGRES</a>
          </li>
          <li className="tag hover">
            <a href="#">PYthon</a>
          </li>
          <li className="tag hover">
            <a href="#">C++</a>
          </li>
          <li className="more">+3 ЕЩЕ</li>
        </ul>
        <div className="date">3 часа назад</div>
      </div>

      <div className="right">
        <div className="item">
          <svg width="20" height="20">
            <use xlinkHref="./img/icons/icons.svg#eye" />
          </svg>
          <p>120</p>
        </div>
        <div className="item">
          <svg width="20" height="20">
            <use xlinkHref="./img/icons/icons.svg#answers" />
          </svg>
          <p>3</p>
        </div>
        <div className="item answer">
          <svg width="20" height="20">
            <use xlinkHref="./img/icons/icons.svg#check" />
          </svg>
          <p>Ответ</p>
        </div>
      </div>

      <svg
        className="favorite"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54.9902 62.48L30.9902 45.639L6.99023 62.48V6.691C6.99023 4.366 8.95223 2 11.2772 2H51.2772C53.6032 2 54.9902 4.366 54.9902 6.691V62.48Z"
          fill="#8B71B5"
        />
        <path
          d="M54.4902 62.98C54.1872 62.98 53.8852 62.889 53.6282 62.708L30.4902 46.471L7.35223 62.708C6.89423 63.031 6.29523 63.07 5.79823 62.811C5.30123 62.553 4.99023 62.04 4.99023 61.48V5.691C4.99023 2.394 7.21424 0 10.2772 0H50.2772C53.4272 0 55.9902 2.553 55.9902 5.691V61.48C55.9902 62.04 55.6782 62.553 55.1822 62.811C54.9642 62.925 54.7272 62.98 54.4902 62.98ZM30.4902 43.139C30.7922 43.139 31.0932 43.229 31.3522 43.411L52.9902 58.596V5.691C52.9902 4.207 51.7732 3 50.2772 3H10.2772C8.69723 3 7.99023 4.351 7.99023 5.691V58.596L29.6282 43.411C29.8872 43.229 30.1882 43.139 30.4902 43.139Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
