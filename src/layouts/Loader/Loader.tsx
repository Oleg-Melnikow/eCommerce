import { ReactElement } from "react";
import useAuth from "hooks/use-auth";
import logoSrc from "../../assets/HeaderLogo.png";
import "./Loader.scss";

function Loader(): ReactElement {
  const { isTokenReceived } = useAuth();
  const style = isTokenReceived ? { display: "none" } : {};
  return (
    <div className="loader" style={style}>
      <img src={logoSrc} alt="Green Shop Logo" />
    </div>
  );
}

export default Loader;
