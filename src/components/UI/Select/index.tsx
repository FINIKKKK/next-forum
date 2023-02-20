import React from "react";
import Select from "react-select";

import ss from "./Select.module.scss";

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
      className={`block ${className} ${ss.select}`}
      classNamePrefix="select"
      value={value}
      onChange={(value: any) => setValue(value)}
      options={options}
    />
  );
};
