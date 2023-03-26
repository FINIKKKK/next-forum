import ss from "./Filters.module.scss";
import classNames from "classnames";
import React from "react";

export const filters = [
  { label: "С ответом", value: 'true' },
  { label: "Без ответа", value: 'false' },
];

interface FiltersProps {
  activeFilter: string | null;
  setActiveFilter: (value: string | null) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const onSetActiveFilter = (index: number) => {
    if (filters[index].value === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filters[index].value);
    }
  };

  return (
    <div className="chooseAnswers">
      {filters.map((obj, index) => (
        <div
          onClick={() => onSetActiveFilter(index)}
          key={index}
          className={classNames("item", {
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
