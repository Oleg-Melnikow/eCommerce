import React, { MouseEvent, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.scss";

function PageNotFound(): ReactElement {
  const [positionX, setPositionX] = useState<string>("");
  const [positionY, setPositionY] = useState<string>("");

  function move(e: MouseEvent): void {
    setPositionX(`${-e.clientX / 5}px`);
    setPositionY(`${-e.clientY / 5}px`);
  }

  return (
    <div
      className="container"
      id="found"
      onMouseMove={move}
      style={{ backgroundPositionX: positionX, backgroundPositionY: positionY }}
    >
      <div className="content">
        <h2>404</h2>
        <h4>Page not found!</h4>
        <p>
          The page you were looking for doesn&apos;t exist. Perhaps, the link
          you entered is not valid or it has been moved.
        </p>
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}

export default PageNotFound;
