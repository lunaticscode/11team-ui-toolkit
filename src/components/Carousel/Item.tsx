import { FC, PropsWithChildren } from "react";
import { useCarouselContext } from "./Root";

export interface CarouselItemProps extends PropsWithChildren {
  index?: number;
}
const CarouselItem: FC<CarouselItemProps> = (props) => {
  const { index } = props;
  const { currentIndex } = useCarouselContext();
  const { children } = props;
  return currentIndex === index ? <>{children}</> : null;
};
export default CarouselItem;
