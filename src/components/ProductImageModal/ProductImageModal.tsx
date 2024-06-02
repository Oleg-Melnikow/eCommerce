import { ReactElement } from "react";
import "./ProductImageModal.scss";
import { Backdrop, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ProductData } from "types/API/Product";

type PropsType = {
  product: ProductData;
  open: boolean;
  currentImageIndex: number;
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
};

function ProductImageModal({
  product,
  open,
  currentImageIndex,
  setOpenModal,
}: PropsType): ReactElement {
  const { images } = product.masterData.current.masterVariant;

  const imagesContent = images.map((image, index) => (
    <Box
      key={`${image.url}`}
      sx={{
        display: `${index === currentImageIndex ? "block" : "none"}`,
        maxWidth: "90%",
        minHeight: "calc(80vh - 100px)",
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

  return (
    <Backdrop
      open={open}
      sx={{
        maxWidth: "100vw",
        alignItems: "start",
        pt: "100px",
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
          height: "80%",
          maxWidth: "100%",
        }}
      >
        {imagesContent}
      </Box>
    </Backdrop>
  );
}
export default ProductImageModal;
