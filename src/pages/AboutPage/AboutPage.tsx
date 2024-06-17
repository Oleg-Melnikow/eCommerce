import "./AboutPage.scss";
import React, { ReactElement } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "assets/GitHubIcon.svg";

import { Description, teamData } from "helpers/static-teamData";

import Footer from "../../layouts/Footer/Footer";

function AboutPage(): ReactElement {
  return (
    <Box className="about-page">
      <Box className="about-page__header">
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Our Team
        </Typography>
        <p className="about-page__description">{Description.DESCRIPTION}</p>
        <p className="about-page__description">{Description.OURTEAM}</p>
      </Box>

      <Box className="wrapper__team-info" sx={{ flexGrow: 1 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ margin: "20px 0px 0px" }}
        >
          {teamData.map((item) => (
            <Grid item xs={12} key={item.name}>
              <Box className="inner__dev-photo">
                <img src={item.photo} className="dev-photo" alt={item.name} />
              </Box>

              <Box className="inner__dev-description">
                <span className="inner__dev-description_name">{item.name}</span>
                <span className="inner__dev-description_role">{`(${item.role})`}</span>

                <Typography className="inner__dev-description_about">
                  {item.about}
                </Typography>

                <Typography className="inner__dev-description_description">
                  {item.description}
                </Typography>

                <Link href={item.gitHubLink} className="dev-description_link">
                  <img src={GitHubIcon} alt="GitHubIcon" />
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}

export default AboutPage;
