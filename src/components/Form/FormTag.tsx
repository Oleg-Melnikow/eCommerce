import "./FormTag.scss";
import { ReactElement } from "react";

import FormTagProps from "types/FormTagProps";

function FormTag({
  className,
  id,
  URL,
  onSubmit,
  children,
}: FormTagProps): ReactElement {
  return (
    <form
      className={className}
      id={id}
      action={URL}
      method="post"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default FormTag;
