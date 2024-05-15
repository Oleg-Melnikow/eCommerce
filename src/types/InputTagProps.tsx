import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

interface InputTagProps {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  isError?: boolean;
  message?: string;
  register?: UseFormRegister<FormValues>;
  value?: string;
}

export default InputTagProps;
