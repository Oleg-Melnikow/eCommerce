import React, { ReactElement, useEffect, useState, useRef } from "react";

interface MovingPromoCodeProps {
  promoCode: string;
  description?: string;
}

export function MovingPromoCode({
  promoCode,
  description,
}: MovingPromoCodeProps): ReactElement {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number | undefined;
    let containerWidth = 0;
    const textWidth = 0;

    const animate = (): void => {
      if (containerRef.current) {
        containerWidth = containerRef.current.clientWidth;

        setPosition((prevPosition) => {
          if (prevPosition >= containerWidth) {
            return -textWidth;
          }
          return prevPosition + 0.5;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return (): void => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="main-page__animate_item"
      style={{
        whiteSpace: "nowrap",
        position: "relative",
        left: `${position}px`,
        display: "inline-block",
      }}
    >
      {promoCode} - {description}
    </div>
  );
}
