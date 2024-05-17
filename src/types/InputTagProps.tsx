type FormValuesType = {
  email: string;
  password: string;
};

interface InputTagProps {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  isError?: boolean;
  message?: string;
  value?: string;
  label?: string;
  name?: string;
}

export { InputTagProps, FormValuesType };
