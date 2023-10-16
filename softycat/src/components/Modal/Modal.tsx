import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Backdrop } from "./Backdrop.styled";
import { ModalContent } from "./ModalContent.styled";

const modalRoot = document.getElementById('modalroot') as HTMLElement;


export const Modal: React.FC<any> = (props: any) => {
  const handleEscape = (e: any): void => {
    if (e.code === "Escape") {
      props.onClose();
    }
  }
  const handleBackdropClick = (e: any): void => {
    if (e.currentTarget === e.target) {
      props.onClose()
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => { window.removeEventListener("keydown", handleEscape) }
  })
  return (createPortal(<>
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>
        <button type='button' onClick={props.onClose} style={{ float: "right" }}>Close</button>
        {props.children}
      </ModalContent>
    </Backdrop></>, modalRoot!)
  )
}