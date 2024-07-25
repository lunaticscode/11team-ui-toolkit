import {
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { useModalContext } from "./Root";

export interface ModalTriggerProps
  extends PropsWithChildren,
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

const ModalTrigger: FC<ModalTriggerProps> = (props) => {
  const { children, ...buttonElementProps } = props;
  const {
    open: currentOpenState,
    handleOpenChange,
    setTrigger,
  } = useModalContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const handleClickTrigger = () => {
    if (buttonElementProps.disabled) {
      return;
    }
    handleOpenChange?.(!currentOpenState);
  };

  useEffect(() => {
    if (triggerRef.current) {
      setTrigger(triggerRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef.current]);
  return (
    <button
      {...buttonElementProps}
      onClick={handleClickTrigger}
      ref={triggerRef}
    >
      {children}
    </button>
  );
};
export default ModalTrigger;
