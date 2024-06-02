import { ReactElement } from "react";
import { Backdrop, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ProductData } from "types/API/Product";
import styled from "@emotion/styled/types/base";

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
    <Box
      key={`${image.url}`}
      sx={{
        display: `${index === currentImageIndex ? "block" : "none"}`,
        maxWidth: "100%",
        height: "100%",
      }}
    >
      <img
        src={image.url}
        alt={image.label}
        draggable="false"
        style={{
          maxWidth: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "top",
        }}
      />
    </Box>
  ));

  const controlsBox = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
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
        maxWidth: "100vw",
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
          maxWidth: "100%",
        }}
      >
        {imagesContent}
        {controlsBox}
      </Box>
    </Backdrop>
  );
}
export default ProductImageModal;
