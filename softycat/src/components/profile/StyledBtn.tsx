import styled from "@emotion/styled";

export const StyledBtn = styled("button")({
  padding: "7px",
  flex: "2 1 ",
  // flexBasis: "calc((100% - 20px) / 3 - 24px)",
  borderRadius: "23%",
  backgroundColor: "#5b8cde",
  margin: "23px",
  textAlign: "center",
  ":hover": {
    backgroundColor: "Highlight",
    cursor: "pointer"
  }
  // marginLeft: "10px",
  // marginBottom: "10px",
})