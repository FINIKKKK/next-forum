import classNames from 'classnames';
import React from 'react';

import { useSelectors } from '@/hooks/useSelectors';

import ss from './ProfileNav.module.scss';

const navLabels = [
  { id: 1, name: 'Мои вопросы', name2: 'Вопросы' },
  { id: 2, name: 'Мое избранное', name2: 'Избранное' },
];

interface ProfileNavProps {
  isAuthor: boolean;
  active: number;
  setActive: (value: number) => void;
}

export const ProfileNav: React.FC<ProfileNavProps> = ({
  isAuthor,
  active,
  setActive,
}) => {
  return (
    <ul className={ss.nav}>
      {navLabels.map((obj, index) =>
        obj.id === 2 && !isAuthor ? null : (
          <li
            onClick={() => setActive(index)}
            className={classNames('hover', ss.item, {
              [ss.active]: index === active,
            })}
            key={obj.id}
          >
            {isAuthor ? obj.name : obj.name2}
          </li>
        ),
      )}
    </ul>
  );
};
