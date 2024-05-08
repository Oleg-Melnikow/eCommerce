import "./InputTag.scss";

import InputTagProps from "types/InputTagProps";

function InputTag({ type, id, onChange }: InputTagProps): JSX.Element {
  let styleInput = "input";
  let placeholder = "";
  let name = "";
  let localId = id;

  switch (type) {
    case "text":
      styleInput = `${styleInput} input_username`;
      placeholder = "Username";
      name = "username";
      localId = "username";
      break;
    case "email":
      styleInput = `${styleInput} input_email`;
      placeholder = "Enter your email adress";
      name = "email";
      localId = "email";
      break;
    case "password":
      styleInput = `${styleInput} input_password`;
      placeholder = localId === "password" ? "Password" : "Confirm Password";
      break;
    default:
      break;
  }

  return (
    <input
      type={type}
      id={localId}
      name={name}
      className={styleInput}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default InputTag;
