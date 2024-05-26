import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { countriesData } from "helpers/static-data";
import { ReactElement } from "react";

import SelectTagProps from "types/SelectTagProps";

function SelectTag({
  id,
  onChange,
  isError,
  message,
  valueTag,
}: SelectTagProps): ReactElement {
  return (
    <FormControl fullWidth sx={{ mt: 2 }} size="small" error={isError}>
      <InputLabel id="selectCountry">Country</InputLabel>
      <Select
        name={id}
        labelId="selectCountry"
        id={id}
        value={valueTag || ""}
        label="Country"
        onChange={onChange}
      >
        {countriesData.map(({ value, label }) => (
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
