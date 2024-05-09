import "./InputTag.scss";

import InputTagProps from "types/InputTagProps";

function InputTag({ type, id, onChange }: InputTagProps): JSX.Element {
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
