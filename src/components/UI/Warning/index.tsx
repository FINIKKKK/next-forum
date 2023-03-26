import classNames from 'classnames';
import React from 'react';

import ss from './Warning.module.scss';

interface WarningProps {
  message: string;
  isActive: boolean;
}

export const Warning: React.FC<WarningProps> = ({ message, isActive }) => {
  return (
    <div
      className={classNames('block', ss.warning, {
        [ss.active]: isActive,
      })}
    >
      {message}
    </div>
  );
};
