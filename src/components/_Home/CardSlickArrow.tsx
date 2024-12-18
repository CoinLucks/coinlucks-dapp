import type { ReactNode } from "react";

const SlickArrow = ({
  currentSlide,
  slideCount,
  children,
  ...props
}: {
  currentSlide?: number;
  slideCount?: number;
  children: ReactNode;
}) => (
  <button aria-label="arrow" {...props}>
    {children}
  </button>
);

export default SlickArrow;
