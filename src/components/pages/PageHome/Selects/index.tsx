import { SelectComponent, TOption } from "@/components";
import React from "react";

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
      <SelectComponent value={option} options={options} setValue={setOption} />

      {option === options[1] && (
        <SelectComponent value={option2} options={options2} setValue={setOption2} />
      )}
    </div>
  );
};
