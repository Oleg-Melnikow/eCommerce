import { ReactElement, useRef, useState } from "react";
import "./slider.scss";
import { ProductData } from "types/API/Product";
import { Box, Slide } from "@mui/material";

type PropsType = {
  product: ProductData;
};

function Slider({ product }: PropsType): ReactElement {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { images } = product.masterData.current.masterVariant;
  const thumbs = images.map((image) => (
    <img
      key={`${image.url}`}
      className="slider__thumb"
      src={image.url}
      alt={image.label}
    />
  ));

  const slider = images.map((image, index) => (
    <Slide
      key={image.url}
      direction="left"
      in={currentSlide === index}
      appear={false}
      container={containerRef.current}
    >
      <img className="slider__image" src={image.url} alt={image.label} />
    </Slide>
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
      <div className="slider__thumbs-wrapper">{thumbs} </div>
      <Box
        className="slider__image-wrap"
        onClick={handleNextSlide}
        ref={containerRef}
      >
        {slider}
      </Box>
    </div>
  );
}

export default Slider;
