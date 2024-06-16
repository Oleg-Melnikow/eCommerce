import "./MainPage.scss";
import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { DescriptionCare, StaticMainPage } from "helpers/static-mainData";

function MainPage(): ReactElement {
  return (
    <div className="main-page" style={{ marginTop: "30px" }}>
      <Box className="main-page__section-care">
        <Typography className="main-page__section-care_title">
          Steps To Take Care Of Your <span>Plants</span>
        </Typography>
        <Typography className="main-page__section-care_desc">
          {DescriptionCare.TAKECARE}
        </Typography>
      </Box>

      <Box className="section-care__plant">
        {StaticMainPage.map((item) => (
          <Box className="section-care__plant_item" key={item.id}>
            <img className="plant__item_img" src={item.icon} alt={item.alt} />
            <Typography className="plant__item_title">{item.title}</Typography>
            <Typography className="plant__item_desc">{item.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* <iframe
        width="100%"
        height="600px"
        src="https://www.youtube.com/embed/pZVdQLn_E5w?autoplay=1&mute=1&si=SrZUNlGItj4kMeGh"
        frameBorder="0"
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe> */}
    </div>
  );
}

export default MainPage;
