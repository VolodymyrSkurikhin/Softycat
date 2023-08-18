import styled from "@emotion/styled";
// import { hover } from "@testing-library/user-event/dist/hover";
// import { FC } from 'react'
import { NavLink } from "react-router-dom";

export const RegBtn = styled(NavLink)({
  padding: "8px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "black",
  backgroundColor: "grey",
  fontWeight: "500",
  '&.active': { backgroundColor: "orangered" }
}
)