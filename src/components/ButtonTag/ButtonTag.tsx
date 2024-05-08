import "./ButtonTag.scss";
import { ReactElement } from "react";

import ButtonTagProps from "../../types/ButtonTagProps";

function ButtonTag({ type, title, onClick }: ButtonTagProps): ReactElement {
  let classNameBtn = "button";

  switch (type) {
    case "button":
      classNameBtn = `${classNameBtn} button__login`;
      break;
    case "submit":
      classNameBtn = `${classNameBtn} button__registration`;
      break;
    case "reset":
      classNameBtn = `${classNameBtn} button__login`;
      break;
    default:
      break;
  }

  const handleClick = (): void => {
    if (type !== "submit") {
      onClick?.();
      console.log("Клик по кнопке формы регистрации");
    }
  };

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={classNameBtn}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default ButtonTag;
