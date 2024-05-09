import "./SelectTag.scss";
import { ReactElement } from "react";

import SelectTagProps from "types/SelectTagProps"; // Импортируем типы свойств для селекта

function SelectTag({ id, onChange }: SelectTagProps): ReactElement {
  const options = [
    {
      value: "",
      label: "Select country",
      disabled: true,
      selected: true,
    },
    { value: "1", label: "Belarus" },
    { value: "2", label: "European Union" },
    { value: "3", label: "The United Kingdom" },
    { value: "4", label: "USA" },
  ];

  return (
    <select id={id} className="select select_country" onChange={onChange}>
      {options.map((option, index) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          selected={option.selected}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectTag;
