import "./Footer.scss";
import React, { ReactElement } from "react";
import { styled } from "@mui/system";

import HeaderLogo from "assets/HeaderLogo.png";
import Location from "assets/icons/Location.png";
import Message from "assets/icons/Message.png";
import Calling from "assets/icons/Calling.png";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";

import { Contacts } from "helpers/static-teamData";

const CustomLink = styled(Link)({
  textDecoration: "underline",
  textDecorationColor: "rgb(61, 61, 61)",
  transition: "text-decoration-color 0.5s ease",
  "&:hover": {
    textDecorationColor: "rgb(70, 163, 88)",
  },
});

function Footer(): ReactElement {
  return (
    <footer className="footer">
      <Box className="footer__contacts">
        <NavLink to="/">
          <img src={HeaderLogo} className="footer__contacts_logo" alt="Logo" />
        </NavLink>

        {Contacts.map((contact) => (
          <Box className={`${contact.classNameBox}`} key={contact.alt}>
            <img className="icon" src={contact.icon} alt={contact.alt} />
            <CustomLink
              href={contact.href}
              className={contact.classNameLink}
              target="_blank"
            >
              {contact.text}
            </CustomLink>
          </Box>
        ))}
      </Box>
    </footer>
  );
}

export default Footer;
