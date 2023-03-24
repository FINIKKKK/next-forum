import React from 'react';

import ss from './UserAbout.module.scss';

interface UserAboutProps {
  questionCount: number;
  answerCount: number;
}

export const UserAbout: React.FC<UserAboutProps> = ({
  questionCount,
  answerCount,
}) => {
  return (
    <div className={`user__about block ${ss.info}`}>
      <div className={ss.about}>
        <div className={ss.label}>О себе:</div>
        <p className={ss.item}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
          <br />
          <br />
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
      </div>
      <div className={ss.statistic}>
        <p className={ss.item}>
          <b>117</b>
          Подписчики
        </p>
        <p className={ss.item}>
          <b>{questionCount}</b>
          Вопросы
        </p>
        <p className={ss.item}>
          <b>{answerCount}</b>
          Ответы
        </p>
      </div>
    </div>
  );
};
