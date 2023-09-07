import styled from "@emotion/styled"
import { useUser } from "../components/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../Service/axiosFns";

export const Logout = () => {
  const { logOut, token } = useUser();
  const navigate = useNavigate();
  if (!token) {
    alert("You are not loggedin!");
    return <Navigate to="/login" />;
  }
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
    if (logoutResponse.success === true) {
      logOut();
      localStorage.removeItem("user");
      alert(`${logoutResponse.logoutMessage}`);
      navigate("/home");
    } else if (logoutResponse.errorStatus === 401) {
      alert(`You are not logged in`);
      logOut();
      localStorage.removeItem("user");
      navigate("/home");
      return;
    } alert(`Something went wrong.Try again`);
    return <Navigate to="/home" />;

  }
  return (<LogoutContainer onClick={handleSubmit}>Press here, if you sure want to logout</LogoutContainer>)
}