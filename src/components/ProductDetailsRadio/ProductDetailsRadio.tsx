import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./ProductDetailsRadio.scss";
import { ReactElement } from "react";

enum Sizes {
  s = "S",
  m = "M",
  l = "L",
  xl = "XL",
}

type PropsType = {
  className: string;
};

function ProductDetailsRadio({ className }: PropsType): ReactElement {
  const icon = (value: Sizes, isChecked?: boolean): JSX.Element => (
    <div
      className={
        isChecked
          ? `${className}__radio-label--checked radio-label--checked`
          : `${className}__radio-label radio-label`
      }
    >
      {value}
    </div>
  );
  const radioBtns = Object.values(Sizes).map((sizeValue) => {
    return (
      <Radio
        key={sizeValue}
        className={`${className}__radio-btn radio-btn`}
        value={sizeValue}
        icon={icon(sizeValue)}
        checkedIcon={icon(sizeValue, true)}
        name="radio-product-details"
      />
    );
  });
  return (
    <FormControl>
      <FormLabel
        id="product-details-radio-group"
        className={`${className}__subtitle`}
      >
        <h4>Size:</h4>
      </FormLabel>
      <RadioGroup
        row
        defaultValue={Sizes.s}
        name="product-details-radio-group"
        className={`${className}__radio-group radio-group`}
      >
        {radioBtns}
      </RadioGroup>
    </FormControl>
  );
}

export default ProductDetailsRadio;
