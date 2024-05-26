import { CardActionArea, CardActions, Typography } from "@mui/material";
import { ReactElement } from "react";
import { ProductData } from "types/API/Product";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import useProduct from "hooks/use-product";
import { ProductPrice } from "./ProductPrice/ProductPrice";
import "./ProductCard.scss";

type PropsType = {
  product: ProductData;
};

function ProductCard({ product }: PropsType): ReactElement {
  const navigate = useNavigate();
  const { id, masterData } = product;
  const { name, masterVariant, description } = masterData.current;
  const { prices, images } = masterVariant;
  const [price] = prices;
  const [image] = images;

  const onClickProduct = (): void => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{ maxWidth: 280, position: "relative", overflow: "visible" }}
      onClick={onClickProduct}
    >
      {price.discounted && (
        <div className="ribbon ribbon-top-right">
          <span>Sale</span>
        </div>
      )}
      <CardActionArea>
        <CardMedia
          className="product-image"
          image={image.url}
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
        <CardActions>
          <ProductPrice price={price} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
