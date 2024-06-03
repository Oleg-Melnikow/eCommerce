import { ReactElement } from "react";
import { Backdrop, Box, IconButton, Zoom } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ProductData } from "types/API/Product";

type PropsType = {
  product: ProductData;
  open: boolean;
  currentImageIndex: number;
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
  controls: JSX.Element;
};

function ProductImageModal({
  product,
  open,
  currentImageIndex,
  setOpenModal,
  controls,
}: PropsType): ReactElement {
  const { images } = product.masterData.current.masterVariant;

  const imagesContent = images.map((image, index) => (
    <Zoom
      key={`${image.url}`}
      in={index === currentImageIndex}
      style={{
        position: "absolute",
        maxWidth: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "top",
      }}
    >
      <img src={image.url} alt={image.label} draggable="false" />
    </Zoom>
  ));

  const controlsBox = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#3d3d3d3d",
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0 0 15px 0 #3d3d3d",
      }}
    >
      {controls}
    </Box>
  );

  return (
    <Backdrop
      open={open}
      sx={{
        width: "100vw",
        alignItems: "start",
        pt: "100px",
        pb: "25px",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(10px)",
      }}
    >
      <IconButton
        onClick={() => setOpenModal(false)}
        sx={{
          position: "absolute",
          top: "25px",
          right: "25px",
          height: "40px",
          width: "40px",
          color: "#fff",
          backgroundColor: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        className="product-modal__slider-wrap"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          height: "100%",
          width: "100%",
          px: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {imagesContent}
        </Box>
        {images.length > 1 && controlsBox}
      </Box>
    </Backdrop>
  );
}
export default ProductImageModal;
