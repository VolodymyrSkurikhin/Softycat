import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

export const Backdrop = styled('div')({
  position: "fixed",
  top: "0",
  left: "0",
  height: "100vw",
  width: "100vw",
  backgroundColor: `${rgba('#fafab1', 0.8)}`,
  // maxWidth: "100%",
  // heght: "auto",
  // maxWidth: "100%",
  // flex: "1 0",
})