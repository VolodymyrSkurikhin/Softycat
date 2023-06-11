import OwnerList from "./components/cards/OwnerList";
import { Container } from "./App.styled";
import { CommonContainer, Header, Nav, Logo, Link } from "./components/common/Common.styled";
import list from "./Service/list.json";

const App: React.FC = () => {
  return (<CommonContainer>
    <Header>
      <Logo>Test</Logo>
      <Nav>
        <Link to="/about">About
        </Link>
        <Link to="/cats">Cats</Link>
      </Nav>
    </Header>
    <Container>
      <OwnerList owners={list} />
    </Container>
  </CommonContainer>
  );
}

export default App;
