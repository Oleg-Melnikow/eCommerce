import { ReactNode } from "react";

interface FormTagProps {
  className: string;
  id: string;
  URL: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default FormTagProps;
