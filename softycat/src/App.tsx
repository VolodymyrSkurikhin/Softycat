import { Routes, Route } from "react-router-dom";
// import Animal from "react-animals";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/Signup";
// import { Container } from "./App.styled";
import { CommonContainer, Header, NavStart, NavEnd, Link, UpLink } from "./components/common/Common.styled";
// import { RegBtnContainer } from "./components/RegBtns/RegBtnContainer.styled";
// import { RegBtn } from "./components/RegBtns/RegBtn.styled";
import { RegBtnContainer } from "./components/RegBtns/RegBtnContainer";
import { Logout } from "./pages/Logout";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { useUser } from "./components/userContext";
import { Family } from "./pages/Family";
import { Images } from "./pages/Images";
import { About } from "./pages/About";

// import list from "./Service/list.json";

const App: React.FC = () => {
  const { token } = useUser();
  return (<CommonContainer>
    <Header>
      {/* <Logo>
        <Animal name="cheetah" size="75px" dance rounded />
      </Logo> */}
      <NavStart>
        <UpLink to="/">Up</UpLink>
        <Link to="/about">About
        </Link>
        <Link to="/home">Cats</Link>
        {/* <Link to="/SignUp">SignUp</Link> */}
      </NavStart>
      <NavEnd>
        <RegBtnContainer />
        {/* <RegBtn to="/register">Register</RegBtn>
        <RegBtn to="/login">Login</RegBtn> */}
        {/* </RegBtnContainer> */}
      </NavEnd>
    </Header>
    <Routes>
      <Route path="/" />
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:ownerId" element={<Family />} />
      <Route path="/home/:ownerId/:catId" element={<Images />} />
      <Route path="/register" element={token ? <Home /> : <SignUp />} />
      <Route path="/login" element={token ? <Home /> : <Login />} />
      <Route path="/logout" element={token ? <Logout /> : <Home />} />
      <Route path="/profile" element={token ? <Profile /> : <Home />} />
    </Routes>
    {/* <Container>
      <OwnerList owners={list} />
    </Container> */}
  </CommonContainer>
  );
}

export default App;
