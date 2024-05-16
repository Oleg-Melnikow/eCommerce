import { IconButton, InputAdornment, TextField } from "@mui/material";
import { InputTagProps } from "types/InputTagProps";
import { ReactElement, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordButtonProps = {
  showPassword: boolean;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function PasswordButton(props: PasswordButtonProps): ReactElement {
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } =
    props;
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}

function InputTag({
  type,
  onChange,
  isError,
  message,
  value,
  name,
  label,
}: InputTagProps): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  let inputType = type;

  if (type === "password") {
    inputType = type === "password" && !showPassword ? type : "text";
  }

  const date = new Date();

  return (
    <TextField
      variant="outlined"
      fullWidth
      size="small"
      sx={{ mt: 2 }}
      label={label}
      value={value || ""}
      type={inputType}
      name={name}
      id={name}
      onChange={onChange}
      InputProps={{
        inputProps: {
          max: `2024-05-${date.getDate()}`,
        },
        endAdornment: type === "password" && (
          <PasswordButton
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        ),
      }}
      FormHelperTextProps={{ sx: { margin: 0 } }}
      error={isError}
      helperText={message || ""}
    />
  );
}

export default InputTag;
