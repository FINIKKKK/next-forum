import React from 'react';

import { usePressKey } from '@/hooks/usePressKey';

import ss from './UserAbout.module.scss';

interface UserAboutProps {
  isEdit: boolean;
  about?: string;
  questionCount: number;
  answerCount: number;
}

export const UserAbout: React.FC<UserAboutProps> = ({
  isEdit,
  about,
  questionCount,
  answerCount,
}) => {
  return (
    <div className={`user__about block ${ss.info}`}>
      <div className={ss.about}>
        {isEdit ? (
          <div className={ss.box}>
            <label className={ss.label}>О себе:</label>
            <textarea
              maxLength={900}
              onKeyPress={(e: any) => usePressKey(e, 'Enter')}
              className="input block"
            ></textarea>
          </div>
        ) : (
          <div className={ss.box}>
            <label className={ss.label}>О себе:</label>
            <p className={ss.item}>{about}</p>
          </div>
        )}
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
