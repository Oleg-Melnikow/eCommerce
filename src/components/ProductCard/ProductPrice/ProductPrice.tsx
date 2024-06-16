import { Box, Typography } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import { ReactElement } from "react";
import { Price } from "types/API/Product";
import "../ProductCard.scss";

type PropsType = {
  price: Price;
  classNamePredicate?: string;
};

type PriceItemPropsType = {
  price: number;
  classNamePredicate?: string;
};

function PriceItem({
  price,
  classNamePredicate,
}: PriceItemPropsType): ReactElement {
  return (
    <>
      <EuroIcon
        sx={{ fontSize: "20px" }}
        className={
          classNamePredicate
            ? `product-price-icon ${classNamePredicate}__product-price-icon`
            : "product-price-icon"
        }
      />
      <Typography
        sx={{ fontSize: "18px" }}
        variant="body1"
        component="p"
        className={
          classNamePredicate
            ? `product-price-value ${classNamePredicate}__product-price-value`
            : "product-price-value"
        }
      >
        {(price / 100).toFixed(2)}
      </Typography>
    </>
  );
}

export function ProductPrice({
  price,
  classNamePredicate,
}: PropsType): ReactElement {
  const { value, discounted } = price;
  const currentPrice = discounted
    ? discounted?.value.centAmount
    : value.centAmount;
  return (
    <Box
      className={
        classNamePredicate
          ? `product-price ${classNamePredicate}__product-price`
          : "product-price"
      }
    >
      <Box className="product-price__block">
        <PriceItem
          price={currentPrice}
          classNamePredicate={classNamePredicate}
        />
      </Box>
      {discounted && (
        <Box className="product-price__block sale">
          <Box className="underline" />
          <PriceItem
            price={value.centAmount}
            classNamePredicate={classNamePredicate}
          />
        </Box>
      )}
    </Box>
  );
}
