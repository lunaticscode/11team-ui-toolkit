import {
  PropsWithChildren,
  FC,
  useMemo,
  CSSProperties,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "./Root";

// type ModalPositions = "bottom-left" | "bottom-right";
export interface ModalContentProps extends PropsWithChildren {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}
const ModalContent: FC<ModalContentProps> = (props) => {
  const { children, width = "400px", height = "400px" } = props;
  const {
    open: currentOpenState,
    handleOpenChange,
    trigger,
  } = useModalContext();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef && trigger) {
      if (e.target === trigger.current) return;
      const isInside = contentRef.current?.contains(e.target as HTMLElement);
      handleOpenChange?.(isInside);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [trigger?.current]);

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
          ref={contentRef}
          style={{
            border: "1px solid black",
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
