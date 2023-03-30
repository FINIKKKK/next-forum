import classNames from 'classnames';
import React from 'react';

import ss from './IsAnswers.module.scss';

export const isAnswers = [
  { label: 'С ответом', value: 'true' },
  { label: 'Без ответа', value: 'false' },
];

interface IsAnswersProps {
  activeFilter: string | null;
  setActiveFilter: (value: string | null) => void;
}

export const IsAnswers: React.FC<IsAnswersProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const onSetActiveFilter = (index: number) => {
    if (isAnswers[index].value === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(isAnswers[index].value);
    }
  };

  return (
    <div className="chooseAnswers">
      {isAnswers.map((obj, index) => (
        <div
          onClick={() => onSetActiveFilter(index)}
          key={index}
          className={classNames('item', {
            active: activeFilter === obj.value,
          })}
        >
          <p>{obj.label}</p>
          <svg width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#check" />
          </svg>
        </div>
      ))}
    </div>
  );
};
