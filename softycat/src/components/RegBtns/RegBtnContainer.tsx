// import styled from "@emotion/styled";
import { useUser } from "../userContext";
import { RegBtn } from "./RegBtn.styled";

// export const RegBtnContainer = styled('div')({
//   display: "flex",
//   justifyContent: "space-between"
// })

export const RegBtnContainer = () => {
  const { token, name } = useUser();
  if (!token) {
    return (<><RegBtn to="/register">Register</RegBtn>
      <RegBtn to="/login">Login</RegBtn></>)
  } else {
    return (<><RegBtn to="/profile">{name}</RegBtn>
      <RegBtn to="/logout">Logout</RegBtn></>)
  }
}