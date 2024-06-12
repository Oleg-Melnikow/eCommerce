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

        <Box className="contacts__address">
          <img className="icon" src={Location} alt="IconColling" />
          <CustomLink
            href="https://yandex.by/maps/-/CDrW6U2o"
            className="contacts__address_text"
            target="_blank"
          >
            2170 Grand Avenue Baldwin, NY 11510
          </CustomLink>
        </Box>

        <Box className="contacts__message">
          <img className="icon" src={Message} alt="IconMessage" />
          <CustomLink
            href="https://www.google.com/intl/ru/gmail/about/"
            className="contacts__message_text"
            target="_blank"
          >
            contact@greenshop.com
          </CustomLink>
        </Box>

        <Box className="contacts__tel">
          <img className="icon" src={Calling} alt="IconColling" />
          <CustomLink
            href="tel:88 01911 717 490"
            className="contacts__message_text"
          >
            +88 01911 717 490
          </CustomLink>
        </Box>
      </Box>
    </footer>
  );
}

export default Footer;
