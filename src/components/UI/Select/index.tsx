import ss from "./Select.module.scss";
import React from "react";
import Select from "react-select";

export type TOption = {
  value: string;
  label: string;
};

interface SelectComponentProps {
  className?: string;
  value: TOption;
  options: TOption[];
  setValue: (value: any) => void;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  className,
  value,
  options,
  setValue,
}) => {
  return (
    <Select
      className={`block hover ${className} ${ss.select}`}
      classNamePrefix="select"
      value={value}
      onChange={(value: any) => setValue(value)}
      options={options}
      isSearchable={false}
      // menuIsOpen={true}
    />
  );
};
