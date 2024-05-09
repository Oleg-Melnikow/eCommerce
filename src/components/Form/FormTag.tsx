import "./FormTag.scss";
import { ReactElement } from "react";

import FormTagProps from "types/FormTagProps";

function FormTag({
  className,
  id,
  url,
  onSubmit,
  children,
}: FormTagProps): ReactElement {
  return (
    <form
      className={className}
      id={id}
      action={url}
      method="post"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default FormTag;
