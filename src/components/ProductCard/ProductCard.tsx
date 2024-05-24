import { CardActionArea, Typography } from "@mui/material";
import { ReactElement } from "react";
import { ProductData } from "types/API/Product";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

type PropsType = {
  product: ProductData;
};

function ProductCard({ product }: PropsType): ReactElement {
  const navigate = useNavigate();
  const { id, masterData } = product;
  const { name, masterVariant, description } = masterData.current;
  const [image] = masterVariant.images;

  const onClickProduct = (): void => {
    navigate(`/product/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 280 }} onClick={onClickProduct}>
      <CardActionArea>
        <CardMedia sx={{ height: 140 }} image={image.url} title={name.en} />
        <CardContent sx={{ p: 1 }}>
          <Typography gutterBottom variant="body1" component="div">
            {name.en}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "4",
              WebkitBoxOrient: "vertical",
            }}
          >
            {description.en}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
