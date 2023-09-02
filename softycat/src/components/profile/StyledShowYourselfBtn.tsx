import styled from "@emotion/styled";

export const StyledShowYourselfBtn = styled("button")({
  padding: "5px",
  flex: "0 1 ",
  flexBasis: "calc((100% - 20px) / 3 - 24px)",
  borderRadius: "10%",
  backgroundColor: "#03cffc",
  justifySelf: "center",
  ":hover": {
    backgroundColor: "Highlight",
    cursor: "pointer"
  }
  // marginBottom: "10px",
})