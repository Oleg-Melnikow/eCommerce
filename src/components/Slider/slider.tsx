import { ReactElement } from "react";
import "./slider.scss";
import { ProductData } from "types/API/Product";

type PropsType = {
  product: ProductData;
};

function Slider({ product }: PropsType): ReactElement {
  const { images } = product.masterData.current.masterVariant;
  const thumbs = images.map((image) => (
    <img
      key={`${image.label}`}
      className="slider__thumb"
      src={image.url}
      alt={image.label}
    />
  ));
  return (
    <div className="slider">
      <div className="slider__thumbs-wrapper">{thumbs} </div>
      <div className="slider__image-wrap">
        <img className="slider__image" src={thumbs[0].props.src} alt="imag" />
      </div>
    </div>
  );
}

export default Slider;
