import "./MainPage.scss";
import React, { ReactElement, useEffect } from "react";

import {
  Description,
  StaticMPCare,
  StaticMPGarden,
} from "helpers/static-mainData";
import { NavLink } from "react-router-dom";
import Footer from "../../layouts/Footer/Footer";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import useCart from "hooks/use-cart";

import WELCOMEIMG from "../../assets/MainBack.png";
import PICTURE from "../../assets/SectPicture.png";

function MainPage(): ReactElement {
  const promoTableHeads = ["Code", "Description"];
  const { allDiscountCodes, getAllDiscountCodes } = useCart();

  useEffect(() => {
    getAllDiscountCodes();
  }, [getAllDiscountCodes]);

  return (
    <div className="main-page">
      <Box className="main-page__section-welcome">
        <Box className="main-page__section-welcome_content">
          <span className="section-welcome__greet">{Description.WELCOME}</span>
          <h2 className="section-welcome__title">
            {Description.BETTERPLANET}
            <span>Planet</span>
          </h2>
          <p className="section-welcome__desc">{Description.ONLINESHOP}</p>

          <NavLink className="section-welcome__button" to="/catalog">
            Catalog Now
          </NavLink>
        </Box>

        <Box className="main-page__section-welcome_inner">
          <img src={WELCOMEIMG} alt="SomePlant" />
        </Box>
      </Box>

      <Box className="main-page__section-care">
        <Typography className="main-page__section-care_title">
          Steps To Take Care Of Your <span>Plants</span>
        </Typography>
        <Typography className="main-page__section-care_desc">
          {Description.TAKECARE}
        </Typography>
      </Box>

      <Box className="section-care__plant">
        {StaticMPCare.map((item) => (
          <Box className="section-care__plant_item" key={item.id}>
            <img className="plant__item_img" src={item.icon} alt={item.alt} />
            <Typography className="plant__item_title">{item.title}</Typography>
            <Typography className="plant__item_desc">{item.text}</Typography>
          </Box>
        ))}
      </Box>

      <Box className="main-page__photo">
        <img src={PICTURE} alt="PlantPicture" />
      </Box>

      <Box className="section-care__garden">
        {StaticMPGarden.map((item) => (
          <Box className="section-care__garden_item" key={item.id}>
            <img className="garden__item_img" src={item.icon} alt={item.alt} />
            <Typography className="garden__item_title">{item.title}</Typography>
            <Typography className="garden__item_desc">{item.text}</Typography>
          </Box>
        ))}
      </Box>

      <Footer />

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

      {!!allDiscountCodes.length && (
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                {promoTableHeads.map((head) => (
                  <TableCell key={head} sx={{ fontWeight: "bold" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allDiscountCodes.map((discountcode) => (
                <TableRow key={discountcode.code}>
                  <TableCell>{discountcode.code}</TableCell>
                  <TableCell>{discountcode.description?.en}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </div>
  );
}

export default MainPage;
