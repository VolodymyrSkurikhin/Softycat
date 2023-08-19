import styled from "@emotion/styled"
import { useUser } from "../components/userContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Service/axiosFns";

export const Logout = () => {
  const { logOut } = useUser();
  const navigate = useNavigate();
  // if (!isLoggedIn) {
  //   alert("You are not loggedin!");
  //   navigate("/home");
  //   return;
  // }
  const LogoutContainer = styled('div')({
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "black",
    backgroundColor: "grey",
    fontWeight: "500"
  }
  );
  const handleSubmit = async () => {
    const logoutResponse = await logoutUser();
    logOut();
    alert(`${logoutResponse}`);
    navigate("/home");
  }
  return (<LogoutContainer onSubmit={handleSubmit}>Press here, if you sure want to logout</LogoutContainer>)
}