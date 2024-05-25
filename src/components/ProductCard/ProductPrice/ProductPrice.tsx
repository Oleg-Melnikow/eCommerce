import { Box, Typography } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import { ReactElement } from "react";
import { Price } from "types/API/Product";
import "../ProductCard.scss";

type PropsType = {
  price: Price;
};

type PriceItemPropsType = {
  price: number;
};

function PriceItem({ price }: PriceItemPropsType): ReactElement {
  return (
    <>
      <EuroIcon sx={{ fontSize: "20px" }} />
      <Typography sx={{ fontSize: "18px" }} variant="body1" component="p">
        {(price / 100).toFixed(2)}
      </Typography>
    </>
  );
}

export function ProductPrice({ price }: PropsType): ReactElement {
  const { value, discounted } = price;
  const currentPrice = discounted
    ? discounted?.value.centAmount
    : value.centAmount;
  return (
    <Box className="product-price">
      <Box className="product-price__block">
        <PriceItem price={currentPrice} />
      </Box>
      {discounted && (
        <Box className="product-price__block sale">
          <Box className="underline" />
          <PriceItem price={value.centAmount} />
        </Box>
      )}
    </Box>
  );
}
