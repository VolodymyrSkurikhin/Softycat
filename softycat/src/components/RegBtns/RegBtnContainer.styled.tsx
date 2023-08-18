// import styled from "@emotion/styled";
import { useUser } from "../userContext";
import { RegBtn } from "./RegBtn.styled";

// export const RegBtnContainer = styled('div')({
//   display: "flex",
//   justifyContent: "space-between"
// })

export const RegBtnContainer = () => {
  const { isLoggedIn, username } = useUser();
  if (!isLoggedIn) {
    return (<><RegBtn to="/register">Register</RegBtn>
      <RegBtn to="/login">Login</RegBtn></>)
  } else {
    return (<><RegBtn to="">{username}</RegBtn>
      <RegBtn to="/logout">Logout</RegBtn></>)
  }
}