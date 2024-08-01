import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  Children,
  ReactElement,
  useMemo,
  cloneElement,
  useEffect,
} from "react";
import CarouselItem from "./Item";
import CarouselNavigator from "./Navigator";

interface CarouselContextProps {
  currentIndex?: number;
  handleChangeIndex?: (index: number) => void;
  itemLength: number;
}
const CarouselContext = createContext<CarouselContextProps>({
  currentIndex: 0,
  handleChangeIndex: () => {},
  itemLength: 0,
});

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("(!) Carousel Context를 호출할 수 없는 범위 입니다.");
  }
  return context;
};
export interface CarouselRootProps extends PropsWithChildren {
  disabled?: boolean;
  pause?: boolean;
}
const CarouselRoot: FC<CarouselRootProps> = (props) => {
  const { children, disabled, pause } = props;
  const [itemLength, setItemLength] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>();

  const handleChangeIndex = (index: number) => {
    if (disabled || pause) return;
    setCurrentIndex(index);
  };
  const contextValue: CarouselContextProps = {
    itemLength,
    currentIndex,
    handleChangeIndex,
  };

  const _children = useMemo(
    () => Children.toArray(children) as ReactElement[],
    [children]
  );
  const carouselItems = useMemo(
    () => _children.filter((child) => child.type === CarouselItem),
    [_children]
  );
  const carouselNavigator = useMemo(
    () => _children.find((child) => child.type === CarouselNavigator),
    [_children]
  );
  useEffect(() => {
    setItemLength(carouselItems.length);
  }, [carouselItems.length]);
  //   const carouselIndicator = useMemo(() => _children.find(child => child.type === CarouselIndicator), [_children]);
  return (
    <CarouselContext.Provider value={contextValue}>
      <div>{itemLength}</div>
      {carouselItems.map((carouselItem, index) =>
        cloneElement(carouselItem, { ...carouselItem.props, index })
      )}
      {carouselNavigator}
    </CarouselContext.Provider>
  );
};
export default CarouselRoot;
