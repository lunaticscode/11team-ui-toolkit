import { ReactNode, forwardRef, useImperativeHandle } from "react";
import { useCarouselContext } from "./Root";

export interface CarouselNavigatorRef {
  next: () => void;
  prev: () => void;
}

type CarouselNavigatorCustomType = (
  prev: () => void,
  next: () => void
) => ReactNode;

export interface CarouselNavigatorProps {
  children?: CarouselNavigatorCustomType;
}

const CarouselNavigator = forwardRef<
  CarouselNavigatorRef,
  CarouselNavigatorProps
>((props, ref) => {
  const { children } = props;
  const {
    itemLength,
    currentIndex = 0,
    handleChangeIndex,
  } = useCarouselContext();
  const handleClickNav = (index: number) => {
    handleChangeIndex?.(index);
  };

  const handleClickPrev = () => {
    const changedIndex = currentIndex - 1;
    if (changedIndex < 0) {
      handleClickNav(itemLength - 1);
    } else {
      handleClickNav(changedIndex);
    }
  };

  const handleClickNext = () => {
    const changedIndex = currentIndex + 1;
    if (changedIndex >= itemLength) {
      handleClickNav(0);
    } else {
      handleClickNav(changedIndex);
    }
  };

  useImperativeHandle(ref, () => ({
    next: handleClickPrev,
    prev: handleClickNext,
  }));

  if (children) {
    return children(handleClickPrev, handleClickNext);
  }

  return (
    <>
      <button onClick={handleClickPrev}>prev</button>
      <button onClick={handleClickNext}>next</button>
    </>
  );
});
export default CarouselNavigator;
