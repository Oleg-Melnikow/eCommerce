import { ReactElement, useRef, useState } from "react";
import "./slider.scss";
import { ProductData } from "types/API/Product";
import { Box, IconButton, Radio, RadioGroup, Slide } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

type PropsType = {
  product: ProductData;
};

function Slider({ product }: PropsType): ReactElement {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { images } = product.masterData.current.masterVariant;

  const thumbs = images.map((image, index) => (
    <Box
      key={`${image.url}`}
      className="slider__tumb-wraper"
      onClick={() => setCurrentSlide(index)}
    >
      <img
        className={`slider__thumb ${currentSlide === index ? "slider__thumb--active" : ""}`}
        src={image.url}
        alt={image.label}
        draggable="false"
      />
    </Box>
  ));

  const slider = images.map((image, index) => (
    <Slide
      key={image.url}
      direction="left"
      in={currentSlide === index}
      appear={false}
      container={containerRef.current}
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

  const handleNextSlide = (): void => {
    setCurrentSlide((prevSlide) =>
      prevSlide + 1 < images.length ? prevSlide + 1 : 0
    );
  };

  const handlePrevSlide = (): void => {
    setCurrentSlide((prevSlide) =>
      prevSlide > 0 ? prevSlide - 1 : images.length - 1
    );
  };

  return (
    <div className="slider">
      <div className="slider__thumbs-container">{thumbs} </div>
      <Box
        className="slider__image-wrap"
        onClick={handleNextSlide}
        ref={containerRef}
      >
        {slider}
      </Box>
      {images.length > 1 && (
        <Box className="slider__btns-row">
          <IconButton onClick={handlePrevSlide}>
            <ArrowCircleLeftIcon color="success" fontSize="large" />
          </IconButton>
          <RadioGroup row className="slider__controls-container">
            {controls}
          </RadioGroup>
          <IconButton onClick={handleNextSlide}>
            <ArrowCircleRightIcon color="success" fontSize="large" />
          </IconButton>
        </Box>
      )}
    </div>
  );
}

export default Slider;
