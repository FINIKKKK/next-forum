import { strict } from "assert";
import React from "react";
import Select from "react-select";

import ss from "./Selects.module.scss";

export const options = [
  { value: "date", label: "Последние" },
  { value: "popular", label: "Популярные" },
];

export const options2 = [
  { value: "forewer", label: "Всё время" },
  { value: "year", label: "Год" },
  { value: "mouth", label: "Месяц" },
  { value: "weak", label: "Неделя" },
  { value: "day", label: "День" },
];

export type TOption = {
  value: string;
  label: string;
};

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
      <Select
        className="select block"
        classNamePrefix="select"
        value={option}
        onChange={(value: any) => setOption(value)}
        options={options}
      />

      {option === options[1] && (
        <Select
          className="select block"
          classNamePrefix="select"
          value={option2}
          onChange={(value: any) => setOption2(value)}
          options={options2}
        />
      )}
    </div>
  );
};
