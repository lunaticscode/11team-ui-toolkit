import { PropsWithChildren, FC, useMemo, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "./Root";

// type ModalPositions = "bottom-left" | "bottom-right";
export interface ModalContentProps extends PropsWithChildren {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}
const ModalContent: FC<ModalContentProps> = (props) => {
  const { children, width = "400px", height = "400px" } = props;
  const { open: currentOpenState, trigger } = useModalContext();
  const position = useMemo(() => {
    if (!trigger?.current) {
      return {
        x: 0,
        y: 0,
      };
    }
    const rect = trigger.current.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y + rect.height,
    };
  }, [trigger?.current]);
  const renderPortal = () => {
    if (currentOpenState) {
      return createPortal(
        <div
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            width,
            height,
          }}
        >
          {children}
        </div>,
        document.body
      );
    }
    return null;
  };
  return <>{renderPortal()}</>;
};

export default ModalContent;
