import styled from "@emotion/styled";

export const StyledBtn = styled("button")({
  display: "flex",
  padding: "10px",
  flex: "0 3 auto",
  // flexBasis: "calc((100% - 20px) / 3 - 24px)",
  borderRadius: "23%",
  borderColor: "inherit",
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