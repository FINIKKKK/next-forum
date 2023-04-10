import React from 'react';

import ss from './Profile.module.scss';

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  return (
    <>
      <div className={ss.avatar}>
        <img src="" alt="avatar" />
        <div className={ss.avatar__btns}>
          <div className={ss.btn}>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#edit" />
            </svg>
            <p>Выбрать изображение</p>
          </div>
          <div className={ss.btn}>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#remove" />
            </svg>
            <p>Удалить изображение</p>
          </div>
        </div>
      </div>
    </>
  );
};
