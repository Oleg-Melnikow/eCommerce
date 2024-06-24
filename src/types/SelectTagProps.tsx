import { SelectChangeEvent } from "@mui/material";

interface SelectTagProps {
  id: string;
  onChange: (event: SelectChangeEvent) => void;
  isError?: boolean;
  message?: string;
  valueTag?: string;
}

export default SelectTagProps;
