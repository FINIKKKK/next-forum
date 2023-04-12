import React from 'react';
import Select from 'react-select';
import Placeholder from 'react-select/dist/declarations/src/components/Placeholder';

import ss from './Select.module.scss';

const MY_SELECT_ID = 'my-select-id';

export type TOption = {
  value: string;
  label: string;
};

interface SelectComponentProps {
  className?: string;
  value: TOption;
  options: TOption[];
  setValue: (value: any) => void;
  placeholder?: string;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  className,
  value,
  options,
  setValue,
  placeholder,
}) => {
  return (
    <Select
      className={`block hover select ${className} ${ss.select}`}
      classNamePrefix="select"
      inputId={MY_SELECT_ID}
      instanceId={MY_SELECT_ID}
      value={value}
      onChange={(value: any) => setValue(value)}
      options={options}
      isSearchable={false}
      placeholder={placeholder}
      // menuIsOpen={true}
    />
  );
};
