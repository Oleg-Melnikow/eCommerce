import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

interface Link {
  path: string;
  title: string;
  className: string;
  imgSrc: string;
  imgAlt: string;
}

function NavLinkAccount({
  path,
  title,
  className,
  imgSrc,
  imgAlt,
}: Link): JSX.Element {
  return (
    <NavLink className={className} to={path}>
      <Tooltip
        title={title}
        arrow
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -6],
                },
              },
            ],
          },
        }}
      >
        <img src={imgSrc} alt={imgAlt} />
      </Tooltip>
    </NavLink>
  );
}

export default NavLinkAccount;
