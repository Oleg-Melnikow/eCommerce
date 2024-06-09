import { ReactElement, useState } from "react";
import "./ProductDetailsCounter.scss";

type PropsType = {
  className: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>> | null;
  addItemToCart?: () => void;
};

function ProductDetailsCounter({
  className,
  count,
  setCount,
  addItemToCart,
}: PropsType): ReactElement {
  let [selfCount, setSelfCount] = useState(count);
  if (setCount) {
    setSelfCount = setCount;
    selfCount = count;
  }
  const increment = (): void => {
    setSelfCount(selfCount + 1);
    if (!setCount && addItemToCart) addItemToCart();
  };
  const decrement = (): void => {
    if (selfCount > 1) setSelfCount(selfCount - 1);
  };

  return (
    <div className={`counter-wrap ${className}__counter`}>
      <button
        className={`counter-btn ${className}__counter-btn`}
        onClick={decrement}
        type="button"
        disabled={selfCount <= 1}
      >
        -
      </button>
      <span className={`counter-value ${className}__counter-value`}>
        {selfCount}
      </span>
      <button
        className={`counter-btn ${className}__counter-btn`}
        onClick={increment}
        type="button"
      >
        +
      </button>
    </div>
  );
}

export default ProductDetailsCounter;
