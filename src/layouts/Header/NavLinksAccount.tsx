import { ReactElement, memo, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import useAuth from "hooks/use-auth";
import { LinkAccount, navLinksToAccount } from "helpers/static-data";
import { Badge, Box } from "@mui/material";
import useCart from "hooks/use-cart";

const NavLinksToAccount = memo(function NavLinksToAccount(): ReactElement {
  const { isAuthenticated, logoutAccount } = useAuth();
  const { fetchActiveCart, activeCart } = useCart();
  const [links, setLinks] = useState<LinkAccount[]>([]);

  const logOut = (): void => {
    logoutAccount();
  };

  const badgeContent = activeCart?.lineItems.length ?? 0;

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
    fetchActiveCart();
  }, [isAuthenticated, filterLink]);

  return (
    <div className="header__inner ">
      {links.map(({ id, title, className, path, imgSrc }) => (
        <Tooltip
          key={id}
          title={title}
          arrow
          sx={{ mr: id === "basket" && badgeContent ? 1 : 0 }}
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
            <Badge
              color="success"
              badgeContent={id === "basket" ? badgeContent : 0}
            >
              <NavLink className={className} to={path}>
                <img src={imgSrc} alt={title} />
              </NavLink>
            </Badge>
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
