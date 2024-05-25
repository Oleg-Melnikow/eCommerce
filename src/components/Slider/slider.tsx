import { ReactElement } from "react";
import "./slider.scss";
import img1 from "../../assets/product/1ab58d21463d86aa3768f5c6c78f8a1f.png";
import img2 from "../../assets/product/90effae17498640571679183299f774e.jpeg";

function Slider(): ReactElement {
  const thumbs = [
    { image: img1, title: "image1" },
    { image: img2, title: "image2" },
  ].map((item) => (
    <img
      key={item.title}
      className="slider__thumb"
      src={item.image}
      alt={item.title}
    />
  ));
  return (
    <div className="slider">
      <div className="slider__thumbs-wrapper">{thumbs} </div>
      <div className="slider__image-wrap">
        <img className="slider__image" src={img1} alt="imag" />
      </div>
    </div>
  );
}

export default Slider;
