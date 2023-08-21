import styled from "@emotion/styled"
import { useUser } from "../components/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../Service/axiosFns";

export const Logout = () => {
  const { logOut, isLoggedIn } = useUser();
  const navigate = useNavigate();
  if (!isLoggedIn) {
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
    if (logoutResponse.status === 200) {
      logOut();
      alert(`${logoutResponse.data.message}`);
      navigate("/home");
    } else { alert(`${logoutResponse.data.message}`) }

  }
  return (<LogoutContainer onClick={handleSubmit}>Press here, if you sure want to logout</LogoutContainer>)
}