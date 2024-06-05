import { ReactElement, useRef, useState } from "react";
import "./slider.scss";
import { ProductData } from "types/API/Product";
import { Box, IconButton, Radio, RadioGroup, Slide } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ProductImageModal from "components/ProductImageModal/ProductImageModal";

type PropsType = {
  product: ProductData;
};

function Slider({ product }: PropsType): ReactElement {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">(
    "left"
  );
  const [openModal, setOpenModal] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLElement>(null);
  const { images } = product.masterData.current.masterVariant;

  const thumbs = images.map((image, index) => (
    <Box
      key={`${image.url}`}
      className="slider__tumb-wraper"
      onClick={() => setCurrentSlide(index)}
      ref={currentSlide === index ? thumbRef : null}
    >
      <img
        className={`slider__thumb ${currentSlide === index ? "slider__thumb--active" : ""}`}
        src={image.url}
        alt={image.label}
        draggable="false"
      />
    </Box>
  ));

  const handleNextSlide = async (): Promise<void> => {
    await setSlideDirection("left");
    await setCurrentSlide((prevSlide) =>
      prevSlide + 1 < images.length ? prevSlide + 1 : 0
    );
    thumbRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handlePrevSlide = async (): Promise<void> => {
    await setSlideDirection("right");
    await setCurrentSlide((prevSlide) =>
      prevSlide > 0 ? prevSlide - 1 : images.length - 1
    );
    thumbRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>): void => {
    setInitialX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>): void => {
    const currentX = event.touches[0].clientX;
    setDeltaX(currentX - initialX);
  };

  const handleTouchEnd = (): void => {
    if (deltaX <= -10) handleNextSlide();
    if (deltaX > -10) handlePrevSlide();
  };

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const slider = images.map((image, index) => (
    <Slide
      key={image.url}
      direction={slideDirection}
      in={currentSlide === index}
      appear={false}
      container={containerRef.current}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleOpenModal}
    >
      <img
        className="slider__image"
        src={image.url}
        alt={image.label}
        draggable="false"
      />
    </Slide>
  ));

  const controls = images.map((image, index) => (
    <Radio
      key={image.url}
      className="slider__conrol"
      value={index}
      icon={<div className="slider__control_icon" />}
      checkedIcon={<div className="slider__control_icon--checked" />}
      checked={index === currentSlide}
    />
  ));

  const controlsGroup = (
    <>
      <IconButton onClick={handlePrevSlide}>
        <ArrowCircleLeftIcon color="success" fontSize="large" />
      </IconButton>
      <RadioGroup row className="slider__controls-container">
        {controls}
      </RadioGroup>
      <IconButton onClick={handleNextSlide}>
        <ArrowCircleRightIcon color="success" fontSize="large" />
      </IconButton>
    </>
  );

  return (
    <>
      <ProductImageModal
        product={product}
        open={openModal}
        currentImageIndex={currentSlide}
        setOpenModal={setOpenModal}
        controls={controlsGroup}
      />
      <div className="slider">
        <div className="slider__thumbs-container">{thumbs} </div>
        <Box className="slider__image-wrap" ref={containerRef}>
          {slider}
        </Box>
        {images.length > 1 && (
          <Box className="slider__btns-row">{controlsGroup} </Box>
        )}
      </div>
    </>
  );
}

export default Slider;
