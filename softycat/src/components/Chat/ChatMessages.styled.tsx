import styled from "@emotion/styled";

export const MyMessage = styled("p")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "end",
  alignItems: "end",
  padding: "5px 5px 5px 5px",
  backgroundColor: "#03fcdf",
  // textAlign: "start"
  marginLeft: "10px"
})

export const YourMessage = styled("p")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "end",
  alignItems: "end",
  padding: "5px 5px 5px 5px",
  backgroundColor: "#abc773",
  // textAlign: "start"
  marginRight: "10px"
})

export const ChatMessagesContainer = styled("div")({
  padding: "5px",
  backgroundColor: "Background"
})

export const TimeStamp = styled("span")({
  paddingLeft: "5px",
  // fontSizeAdjust: "inherit"
  fontFamily: "cursive",
  fontSize: "7%",
  // marginLeft: "1px"
})

export const Name = styled("span")({
  // alignSelf: "end",
  paddingLeft: "5px",
  color: "blueviolet",
  // fontFamily: "fantasy",
  fontFamily: "cursive",
  fontSize: "50%"
})