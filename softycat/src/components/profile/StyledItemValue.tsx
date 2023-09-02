import styled from "@emotion/styled";

export const StyledItemValue = styled("span")({
  padding: "5px",
  flex: "0 1 ",
  flexBasis: "calc((100% - 20px) / 3 - 24px)",
  borderRadius: "10%",
  backgroundColor: "#c4c7cc",
  textAlign: "center",
  justifyContent: "center",
  margin: "10px",
  fontFamily: "cursive",
  transition: ".4s",
  ":hover": {
    color: "#1095c1",
    cursor: "pointer"
  }



  // marginLeft: "10px",
  // marginBottom: "10px",
})