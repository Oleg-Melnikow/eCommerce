import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ReactElement } from "react";

import SelectTagProps from "types/SelectTagProps";

function SelectTag({
  id,
  onChange,
  isError,
  message,
  valueTag,
}: SelectTagProps): ReactElement {
  const options = [
    { value: "BY", label: "Belarus" },
    { value: "UK", label: "The United Kingdom" },
    { value: "USA", label: "USA" },
  ];

  return (
    <FormControl fullWidth sx={{ mt: 2 }} size="small" error={isError}>
      <InputLabel id="selectCountry">Country</InputLabel>
      <Select
        labelId="selectCountry"
        id={id}
        value={valueTag || ""}
        label="Country"
        onChange={onChange}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText sx={{ m: 0 }}>{message}</FormHelperText>}
    </FormControl>
  );
}

export default SelectTag;
