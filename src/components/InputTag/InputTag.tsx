import { IconButton, InputAdornment, TextField } from "@mui/material";
import InputTagProps from "types/InputTagProps";
import { ReactElement, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./InputTag.scss";

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
  id,
  onChange,
  isError,
  message,
  value,
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

  let styleInput = "input";
  let placeholder = "";
  let name = "";
  let localId = id;

  switch (type) {
    case "text":
      styleInput = `${styleInput} ${localId === "username" ? "input_username" : "input_surname"}`;
      name = localId === "username" ? "username" : "surname";
      placeholder = localId === "username" ? "Username" : "Surname";
      break;
    case "date":
      styleInput = `${styleInput} input_date`;
      name = "date";
      placeholder = "Enter your Birthdate";
      break;
    case "email":
      styleInput = `${styleInput} input_email`;
      placeholder = "Email adress";
      name = "email";
      localId = "email";
      break;
    case "password":
      styleInput = `${styleInput} input_password`;
      name = localId === "password" ? "password" : "confirm-password";
      placeholder = localId === "password" ? "Password" : "Confirm Password";
      break;

    default:
      break;
  }

  return (
    <TextField
      variant="outlined"
      fullWidth
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          "&:has(> input:-webkit-autofill)": {
            background: "#e8f0fe",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      }}
      value={value || ""}
      type={id === "password" && !showPassword ? type : "text"}
      id={localId}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      InputProps={{
        className: styleInput,
        inputProps: {
          style: { padding: "8px 0" },
        },
        endAdornment: id === "password" && (
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
