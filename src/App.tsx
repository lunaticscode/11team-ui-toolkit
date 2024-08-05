import { useRef } from "react";
import { Carousel, Modal } from "./components";
import CarouselItem from "./components/Carousel/Item";
import CarouselNavigator, {
  CarouselNavigatorRef,
} from "./components/Carousel/Navigator";

function App() {
  const carouselNavigatorRef = useRef<CarouselNavigatorRef>(null);
  const handleClickCarouselPrev = () => {
    carouselNavigatorRef.current?.prev();
  };
  return (
    <>
      <h2>Modal UI</h2>
      <Modal.Root>
        <Modal.Trigger style={{ marginLeft: "50px" }}>
          modal-on/off
        </Modal.Trigger>
        <Modal.Content>
          <div>This is Modal Content;</div>
        </Modal.Content>
      </Modal.Root>
      <br />
      <br />
      <h2>Carousel UI</h2>
      <Carousel.Root>
        <CarouselItem>CarouseItem-1</CarouselItem>
        <CarouselItem>CarouseItem-2</CarouselItem>
        <CarouselItem>CarouseItem-3</CarouselItem>
        <CarouselItem>CarouseItem-4</CarouselItem>
        <CarouselItem>CarouseItem-5</CarouselItem>
        <CarouselNavigator />
      </Carousel.Root>

      <h2>Carousel UI(Custom Navigator)</h2>
      <Carousel.Root>
        <CarouselItem>CarouseItem-1</CarouselItem>
        <CarouselItem>CarouseItem-2</CarouselItem>
        <CarouselItem>CarouseItem-3</CarouselItem>
        <CarouselItem>CarouseItem-4</CarouselItem>
        <CarouselItem>CarouseItem-5</CarouselItem>
        <CarouselNavigator ref={carouselNavigatorRef}>
          {(prev, next) => (
            <div>
              <button onClick={prev}>custom-prev</button>
              <button onClick={next}>custom-next</button>
            </div>
          )}
        </CarouselNavigator>
      </Carousel.Root>

      <div>
        <button onClick={handleClickCarouselPrev}>carousel-prev</button>
        <button>carousel-next</button>
      </div>
    </>
  );
}

export default App;
