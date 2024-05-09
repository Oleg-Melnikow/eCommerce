import { ReactNode } from "react";

interface FormTagProps {
  className: string;
  id: string;
  url: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default FormTagProps;
