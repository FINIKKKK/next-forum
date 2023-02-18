import classNames from "classnames";
import React from "react";

import ss from "./Filters.module.scss";

export const filters = ["С ответом", "Без ответа"];

interface FiltersProps {
  activeFilter: string | null;
  setActiveFilter: (value: string | null) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const onSetActiveFilter = (index: number) => {
    if (filters[index] === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filters[index]);
    }
  };

  return (
    <div className="chooseAnswers">
      {filters.map((label, index) => (
        <div
          onClick={() => onSetActiveFilter(index)}
          key={index}
          className={classNames("item", {
            active: activeFilter === label,
          })}
        >
          <p>{label}</p>
          <svg width="20" height="20">
            <use xlinkHref="./img/icons/icons.svg#check" />
          </svg>
        </div>
      ))}
    </div>
  );
};
