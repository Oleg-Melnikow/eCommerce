import { ReactElement } from "react";
import logoSrc from "../../assets/HeaderLogo.png";
import "./Loader.scss";

function Loader(): ReactElement {
  return (
    <div className="loader">
      <img src={logoSrc} alt="Green Shop Logo" />
    </div>
  );
}

export default Loader;
