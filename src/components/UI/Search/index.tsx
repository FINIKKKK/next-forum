import debounce from 'lodash.debounce';
import React from 'react';

import ss from './Search.module.scss';

interface SearchProps {
  value: string;
  setValue: (value: string) => void;
  setSearchValue: (value: string) => void;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  setValue,
  setSearchValue,
  className
}) => {
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSearch(e.target.value);
  };
  const setSearch = React.useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 250),
    [],
  );

  return (
    <div className={`search input block hover ${className}`}>
      <input
        value={value}
        onChange={onChangeSearchInput}
        type="text"
        placeholder="Поиск вопросов"
      />
      <svg width="20" height="20">
        <use xlinkHref="../img/icons/icons.svg#search" />
      </svg>
    </div>
  );
};
