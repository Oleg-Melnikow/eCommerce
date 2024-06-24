import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Typography,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { Product } from "types/API/Product";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import useCart from "hooks/use-cart";
import { ProductPrice } from "./ProductPrice/ProductPrice";

import "./ProductCard.scss";

type PropsType = {
  product: Product;
};

function ProductCard({ product }: PropsType): ReactElement {
  const { activeCart, addProductToActiveCart } = useCart();
  const navigate = useNavigate();
  const { id, masterVariant, name, description } = product;
  const { prices, images } = masterVariant;
  const [price] = prices;
  const [image] = images;

  const onClickProduct = (): void => {
    navigate(`/product/${id}`);
  };

  const [isProductToCart, setIsProductToCart] = useState(false);

  const addProductToCard = async (): Promise<void> => {
    await addProductToActiveCart(product, 1);
  };

  useEffect(() => {
    const isProduct = !!activeCart?.lineItems
      .map((item) => item.productId)
      .includes(id);
    setIsProductToCart(isProduct);
  }, [activeCart, id]);

  return (
    <Card
      className="product-card"
      sx={{ width: 280, position: "relative", overflow: "visible" }}
    >
      {price?.discounted && (
        <div className="ribbon ribbon-top-right">
          <span>Sale</span>
        </div>
      )}
      <CardActionArea onClick={onClickProduct}>
        <CardMedia
          className="product-image"
          image={image?.url}
          title={name.en}
        />
        <CardContent sx={{ p: 1 }}>
          <Typography gutterBottom variant="body1" component="div">
            {name.en}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="product-text"
          >
            {description.en}
          </Typography>
        </CardContent>
        <Box sx={{ px: "15px" }}>
          <ProductPrice price={price} />
        </Box>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={addProductToCard}
          fullWidth
          variant="contained"
          color="success"
          size="small"
          disabled={isProductToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
