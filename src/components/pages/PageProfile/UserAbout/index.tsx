import classNames from 'classnames';
import React from 'react';

import { usePressKey } from '@/hooks/usePressKey';

import ss from './UserAbout.module.scss';

interface UserAboutProps {
  isEdit: boolean;
  questionCount: number;
  answerCount: number;
  setAbout: any;
  about: any;
}

export const UserAbout: React.FC<UserAboutProps> = ({
  isEdit,
  questionCount,
  answerCount,
  setAbout,
  about,
}) => {
  return (
    <div
      className={classNames('user__about', 'block', ss.info, {
        [ss.empty]: !about && !isEdit,
        [ss.notEmpty]: about.length < 180 && !isEdit,
      })}
    >
      <div className={ss.about}>
        {isEdit ? (
          <div className={ss.box}>
            <label className={ss.label}>О себе:</label>
            <textarea
              maxLength={900}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              onKeyPress={(e: any) => usePressKey(e, 'Enter')}
              className="input block"
            ></textarea>
          </div>
        ) : (
          about && (
            <div className={ss.box}>
              <label className={ss.label}>О себе:</label>
              <p className={ss.item}>{about}</p>
            </div>
          )
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
