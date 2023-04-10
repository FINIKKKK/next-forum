import React from 'react';

import { Avatar } from '@/components';
import { usePressKey } from '@/hooks/usePressKey';
import { useSelectors } from '@/hooks/useSelectors';

import ss from './Profile.module.scss';

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const { data: user } = useSelectors((state) => state.user);

  return (
    <>
      <div className={ss.avatar}>
        <Avatar avatar={user?.avatar} type="profile" className={ss.img} />
        <div className={ss.avatar__btns}>
          <div className={`btn ${ss.btn}`}>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#edit" />
            </svg>
            <p>Выбрать изображение</p>
          </div>
          <div className={`btn ${ss.btn} ${ss.btn2}`}>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#remove" />
            </svg>
            <p>Удалить изображение</p>
          </div>
        </div>
      </div>

      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>Имя и фамилия</label>
        <input type="text" />
      </div>

      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>Email</label>
        <input type="text" />
      </div>

      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>Местоположение</label>
        <input type="text" />
      </div>

      <div className={`inputBlock checkbox ${ss.inputBlock}`}>
        <input
          // checked={showEmail}
          // onChange={(e) => setShowEmail(e.target.checked)}
          type="checkbox"
          id="checkbox"
          name="checkbox"
        />
        <label htmlFor="checkbox">Показывать email</label>
      </div>

      <div className={`inputBlock ${ss.inputBlock}`}>
        <label>О себе:</label>
        <textarea
          maxLength={900}
          // value={about}
          // onChange={(e) => setAbout(e.target.value)}
          onKeyPress={(e: any) => usePressKey(e, 'Enter')}
          className="input block"
        ></textarea>
      </div>

      <button className={`btn ${`btn ${ss.btn}`}`}>Обновить</button>
    </>
  );
};
