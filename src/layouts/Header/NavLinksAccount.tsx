import { ReactElement, memo, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import useAuth from "hooks/use-auth";
import { LinkAccount, navLinksToAccount } from "helpers/static-data";
import { Box } from "@mui/material";
import useCart from "hooks/use-cart";

const NavLinksToAccount = memo(function NavLinksToAccount(): ReactElement {
  const { isAuthenticated, logoutAccount } = useAuth();
  const { resetActiveCart } = useCart();
  const [links, setLinks] = useState<LinkAccount[]>([]);

  const logOut = (): void => {
    logoutAccount();
    resetActiveCart();
  };

  const filterLink = useCallback((): LinkAccount[] => {
    return navLinksToAccount.filter((link) => {
      if (isAuthenticated) {
        return link.permission !== "unlogined";
      }
      return link.permission !== "logined";
    });
  }, [isAuthenticated]);

  useEffect(() => {
    setLinks(filterLink());
  }, [isAuthenticated, filterLink]);

  return (
    <div className="header__inner ">
      {links.map(({ id, title, className, path, imgSrc }) => (
        <Tooltip
          key={id}
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
          {id !== "logout" ? (
            <NavLink className={className} to={path}>
              <img src={imgSrc} alt={title} />
            </NavLink>
          ) : (
            <Box className={className} onClick={logOut}>
              <img src={imgSrc} alt={title} />
            </Box>
          )}
        </Tooltip>
      ))}
    </div>
  );
});

export default NavLinksToAccount;
