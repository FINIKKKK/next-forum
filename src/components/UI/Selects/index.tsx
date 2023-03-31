import React from 'react';

import { SelectComponent, TOption } from '@/components';

export const options = [
  { id: 1, value: 'date', label: 'Последние' },
  { id: 2, value: 'popular', label: 'Популярные' },
];

export const options2 = [
  { id: 3, value: 'forewer', label: 'Всё время' },
  { id: 4, value: 'year', label: 'Год' },
  { id: 5, value: 'mouth', label: 'Месяц' },
  { id: 6, value: 'weak', label: 'Неделя' },
  { id: 7, value: 'day', label: 'День' },
];

interface SelectsProps {
  option: TOption;
  setOption: (value: any) => void;
  option2: TOption;
  setOption2: (value: any) => void;
}

export const Selects: React.FC<SelectsProps> = ({
  option,
  setOption,
  option2,
  setOption2,
}) => {
  return (
    <div className="selects">
      <SelectComponent
        inputId="select1"
        value={option}
        options={options}
        setValue={setOption}
      />

      {option === options[1] && (
        <SelectComponent
          inputId="select2"
          value={option2}
          options={options2}
          setValue={setOption2}
        />
      )}
    </div>
  );
};
