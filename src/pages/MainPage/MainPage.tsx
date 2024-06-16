import "./MainPage.scss";
import React, { ReactElement, useEffect } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow,} from "@mui/material";
import { DescriptionCare, StaticMainPage } from "helpers/static-mainData";
import { NavLink } from "react-router-dom";
        
import useCart from "hooks/use-cart";

function MainPage(): ReactElement {
  const promoTableHeads = ["Code", "Description"];
  const { allDiscountCodes, getAllDiscountCodes } = useCart();

  useEffect(() => {
    getAllDiscountCodes();
  }, [getAllDiscountCodes]);

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
