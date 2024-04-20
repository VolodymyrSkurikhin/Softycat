import styled from "@emotion/styled";

export const ChatFormStyled = styled("form")({
  display: "flex",
  flexDirection: "column",
  padding: "5px",
  backgroundColor: "#c9c9c7",
  opacity: "0.8"
})

export const Input = styled("input")({
  padding: "5px"
})

export const Btn = styled("button")({
  padding: "2px",
  borderRadius: "10%",
  backgroundColor: "blue",
  textAlign: "center",
  ":hover": {
    backgroundColor: "Highlight",
    cursor: "pointer"
  }
})

export const BtnToLeave = styled("button")({
  float: "left",
  padding: "2px",
  borderRadius: "10%",
  borderWidth: "0",
  backgroundColor: "red",
  textAlign: "center",
  ":hover": {
    backgroundColor: "Highlight",
    cursor: "pointer"
  }
})

export const BtnToHide = styled("button")({
  float: "right",
  padding: "2px",
  borderRadius: "10%",
  borderWidth: "0",
  backgroundColor: "yellow",
  textAlign: "center",
  ":hover": {
    backgroundColor: "Highlight",
    cursor: "pointer"
  }
})