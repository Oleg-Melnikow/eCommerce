import { ReactElement } from "react";
import "./ProductDetailsCounter.scss";

type PropsType = {
  className: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function ProductDetailsCounter({
  className,
  count,
  setCount,
}: PropsType): ReactElement {
  const increment = (): void => {
    setCount(count + 1);
  };
  const decrement = (): void => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className={`counter-wrap ${className}__counter`}>
      <button
        className={`counter-btn ${className}__counter-btn`}
        onClick={decrement}
        type="button"
      >
        -
      </button>
      <span className={`counter-value ${className}__counter-value`}>
        {count}
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
