import { Routes, Route } from "react-router-dom";
import Animal from "react-animals";
import { Home } from "./pages/Home";
// import { Container } from "./App.styled";
import { CommonContainer, Header, Nav, Logo, Link } from "./components/common/Common.styled";
// import list from "./Service/list.json";

const App: React.FC = () => {
  return (<CommonContainer>
    <Header>
      <Logo>
        <Animal name="cheetah" size="75px" dance rounded />
      </Logo>
      <Nav>
        <Link to="/about">About
        </Link>
        <Link to="/home">Cats</Link>
      </Nav>
    </Header>
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
    {/* <Container>
      <OwnerList owners={list} />
    </Container> */}
  </CommonContainer>
  );
}

export default App;
