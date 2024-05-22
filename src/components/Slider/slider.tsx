import { ReactElement } from "react";
import "./slider.scss";
import img1 from "../../assets/product/1ab58d21463d86aa3768f5c6c78f8a1f.png";
import img2 from "../../assets/product/90effae17498640571679183299f774e.jpeg";

function Slider(): ReactElement {
  return (
    <div className="slider">
      <div className="slider__thumbs-wrapper">
        <img className="slider__thumb" src={img1} alt="image1" />
        <img className="slider__thumb" src={img2} alt="image2" />
      </div>
      <div className="slider__image-wrap">
        <img className="slider__image" src={img1} alt="imag" />
      </div>
    </div>
  );
}

export default Slider;
