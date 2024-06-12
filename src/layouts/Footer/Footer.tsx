import "./Footer.scss";
import React, { ReactElement } from "react";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";

import HeaderLogo from "assets/HeaderLogo.png";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { Contacts, SocialIcons, SocialIconRSS } from "helpers/static-teamData";
import Typography from "@mui/material/Typography";

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
      <Box className="footer__social">
        <Box className="social__media">
          <Typography className="social__media_title">Social Media</Typography>

          <Stack direction="row" spacing={1}>
            {SocialIcons.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                sx={{
                  transition: "transform 0.5s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <img
                  src={social.icon}
                  alt={social.alt}
                  style={{ display: "block", width: "40px", height: "40px" }}
                />
              </Link>
            ))}
          </Stack>
        </Box>

        <Box className="social__mediaRSS">
          <Typography className="social__mediaRSS_title">RSSchool</Typography>

          <Link
            className="social__mediaRSS_link"
            key={SocialIconRSS.id}
            href={SocialIconRSS.href}
            target="_blank"
          >
            <img
              className="Rsschool_icon"
              src={SocialIconRSS.icon}
              alt={SocialIconRSS.alt}
              style={{ display: "block", borderRadius: "5px" }}
            />
          </Link>
        </Box>
      </Box>

      <Typography className="social__media_copyright">
        © 2021 GreenShop. All Rights Reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
