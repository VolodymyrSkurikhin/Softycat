import styled from "@emotion/styled";

export const StyledItemValue = styled("span")({
  display: "flex",
  padding: "10px",
  flex: "2 1 auto ",
  // flexBasis: "calc((100% - 20px) / 3 - 24px)",
  // borderRadius: "-10%",
  backgroundColor: "#f2f1a5",
  alignItems: "center",
  justifyContent: "center",
  // textAlign: "center",
  margin: "10px",
  fontFamily: "cursive",
  transition: ".4s",
  color: "#262866",
  ":hover": {
    color: "#1095c1",
    cursor: "pointer"
  }



  // marginLeft: "10px",
  // marginBottom: "10px",
})